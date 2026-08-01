from __future__ import annotations

import struct
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"


class PortfolioParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.references: list[tuple[str, str]] = []
        self.unsafe_blank_links: list[str] = []
        self.images_without_alt: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if element_id := attributes.get("id"):
            self.ids.append(element_id)

        for attribute in ("href", "src"):
            if value := attributes.get(attribute):
                self.references.append((attribute, value))

        if tag == "a" and attributes.get("target") == "_blank":
            rel = set((attributes.get("rel") or "").split())
            if "noopener" not in rel:
                self.unsafe_blank_links.append(attributes.get("href") or "<missing href>")

        if tag == "img" and not (attributes.get("alt") or "").strip():
            self.images_without_alt.append(attributes.get("src") or "<missing src>")


class PortfolioSiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.html = INDEX.read_text(encoding="utf-8")
        cls.parser = PortfolioParser()
        cls.parser.feed(cls.html)

    def test_local_references_exist(self) -> None:
        missing: list[str] = []
        escaped: list[str] = []

        for _, reference in self.parser.references:
            parsed = urlsplit(reference)
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue

            candidate = (ROOT / unquote(parsed.path).lstrip("/")).resolve()
            try:
                candidate.relative_to(ROOT)
            except ValueError:
                escaped.append(reference)
                continue

            if not candidate.exists():
                missing.append(reference)

        self.assertEqual([], escaped, f"References escape the site root: {escaped}")
        self.assertEqual([], missing, f"Missing local files: {missing}")

    def test_ids_are_unique(self) -> None:
        duplicates = sorted({item for item in self.parser.ids if self.parser.ids.count(item) > 1})
        self.assertEqual([], duplicates, f"Duplicate IDs: {duplicates}")

    def test_links_and_images_are_accessible(self) -> None:
        self.assertEqual([], self.parser.unsafe_blank_links)
        self.assertEqual([], self.parser.images_without_alt)

    def test_live_project_is_featured_first(self) -> None:
        project_order = [
            self.html.index("<h4>TFT Damage Lab</h4>"),
            self.html.index("<h4>CineSphere v2</h4>"),
            self.html.index("<h4>LEAP Career Forum v2</h4>"),
            self.html.index("<h4>FDE Career Lab</h4>"),
        ]
        self.assertEqual(sorted(project_order), project_order)

    def test_current_profile_content_is_present(self) -> None:
        required = (
            "Shuhang Feng — Customer-Facing Product Engineer",
            "shuhang.feng@leapcareer.org",
            "Claude Opus",
            "August 2025",
        )
        stale = ("Sean Feng", "shuhangf@usc.edu", "Claude Sonnet")

        for text in required:
            self.assertIn(text, self.html)
        for text in stale:
            self.assertNotIn(text, self.html)

    def test_social_card_dimensions(self) -> None:
        data = (ROOT / "images" / "og.png").read_bytes()
        self.assertEqual(b"\x89PNG\r\n\x1a\n", data[:8])
        width, height = struct.unpack(">II", data[16:24])
        self.assertEqual((1200, 630), (width, height))

    def test_resume_is_a_pdf(self) -> None:
        self.assertTrue((ROOT / "resume.pdf").read_bytes().startswith(b"%PDF-"))


if __name__ == "__main__":
    unittest.main()

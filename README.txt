Wedding Invitation — clean restart with requested changes only

Source: supplied index(20261102-160707).html and accompanying user files.
The original fonts, font sizes, illustrations, event-card design, and animations are retained.

Changes in index.html:
1. Larger transparent music button; attempts audible autoplay, tries again after first tap if blocked by the browser, and pauses when switching apps or tabs. Music stays off on returning until Play is tapped.
2. Removed the complete Razorpay Buy Now button stack and added a safeguard against Framer rehydration.
3. Added Open Graph/Twitter sharing metadata using the supplied wedding-preview.jpg; reduced the blank spacing before the WhatsApp RSVP seashell.
4. Expanded route link and RSVP touch areas without altering existing font sizes.

DEPLOY TO GITHUB PAGES:
Upload index.html AND wedding-preview.jpg together to the weddingcard root.
The page's embedded Framer CSS/JS is used; supplementary style.css and script.js are unchanged and are not loaded by this HTML.
WhatsApp preview is fetched from the live website and may be cached by WhatsApp. Try sharing the updated link with a new ?v=clean1 query after publishing.
Browser policy may disallow audible autoplay until the visitor interacts with the invitation. It cannot be forced by JavaScript.

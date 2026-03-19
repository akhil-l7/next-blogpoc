---

# **Next.js Blog POC**

---

## **Project Overview**

This is a **SSG blog** with the following features:

  
* **Content Management:** Prismic CMS.

* **Comments:** Anonymous commenting system using **Neon DB** (PostgreSQL).

* **Deployment:** Vercel with performance, caching, and security optimizations.

* **Tag Filtering:** Client-side filtering of blog posts by Prismic tags.

* Implement a scalable, fast, and SEO-friendly blog.

  

## **Architecture Overview**

  

### **Rendering & Data Flow**

  

* **Static Site Generation (SSG):** Blog posts pre-rendered at build time using `generateStaticParams()`.

* **Incremental Static Regeneration (ISR):** Content updates via Prismic webhook triggers `/api/prismic-wh` route, which purges cache using `revalidatePath()`.

* **Client-Server Separation:**

  

* Server Components: Prismic data fetching (home, blog posts, tags via TopBar).

* Client Components: Interactive UI (comments, theme toggle, tag filtering).

  

**Data Flow Diagram:**

  

**Blog Posts:**

  

```

Prismic CMS → Build Time (SSG) → Static HTML (Vercel Edge)

```

  

**Comments:**

```

Client Browser → Server Action (submitComment) → Neon DB (PostgreSQL)

```

  

**Content Updates:**

  

```

Prismic CMS → Webhook /api/prismic-wh → Revalidate Cache (Next.js)

```



**Tag Filtering:**

```


Prismic Tags → Server Fetch (TopBar) → Client Filter (Tags component, localStorage, DOM toggle)


```

---

  

### **API Endpoints**

| Method | Endpoint | Description |
| ------ | --------------------------- | ------------------------------ |
| POST |  `/api/prismic-wh`  | Handle Prismic webhook updates |

> **Note:** Comments are fetched directly in the Server Component (`Comments.tsx`) using Neon DB queries, via server actions.


---


  

## **Why Neon DB**

  

* **Seamless Integration with Vercel**

I chose **Neon DB** integrates smoothly with **Vercel**, as well as with **Vercel’s serverless functions**.

  

* **File Storage Limitations**

**Vercel Blob** wasn’t suitable for as it requires reading the entire file for updates, which isn’t efficient. Additionally, it lacks querying and data management features.

  

* **Efficient Data Management and Querying**

**Neon DB** supports **SQL queries**, **filtering**, and **pagination**, making it perfect for data-driven applications. Unlike file-based solutions like **Cloudflare R2** and **Vercel Blob**, it allows fast and efficient data retrieval.

  

* **Data Integrity and Security**

**Neon DB** ensures **data integrity** with **schema validation**, **constraints**, and **transactions**, which are not present in file storage systems. It also offers **encrypted connections** and **role-based access control**, making it more secure and reliable than **R2** or **Blob**.

  

* **Built-in Rate Limiting**

**Neon DB** includes **rate-limiting** features directly within the system, making it easier to manage traffic and prevent abuse.

  

Selected **Neon DB** because it provides a **secure, scalable, and efficient solution** for managing relational data, with powerful querying, data integrity, and built-in features like **rate-limiting**. It integrates seamlessly with **Vercel**, **Vercel Blob**, **Cloudflare R2**, or even other databases like **Supabase** and **Firebase**.

  

---

  

## **Commenting System**

  

* Anonymous comments stored in **Neon DB**.

* **Rate limiting:** 10 POST requests/min per IP (via Vercel Firewall).

* **One comment per post per user:** Enforced with **localStorage** visitor ID.

* **Data structure:**

```json

{

"id": "visitorId__slug",

"slug": "post-slug",

"name": "Commenter name (or 'Anonymous')",

"message": "Comment text",

"createdAt": 1678592921000

}

```

> **Note:** The `id` field uses a composite key (`visitorId__slug`) to enforce one comment per post per user at the database level.

## Limitation
id can be removed, but ip based limiting has been added.  

---

## **Tag Filtering**

Client-side filtering of blog posts by Prismic tags on the home page.

### **Overview**

Users can filter blog posts by clicking on tag badges. The selection persists across sessions using `localStorage`, and a "Clear" option allows users to reset the filter.

### **Components**

#### **1. `TopBar.tsx` (Server-side)**

* Fetches all tags from Prismic using `client.getTags()`.
* Conditionally renders the `Tags` component if tags exist.

#### **2. `Tags.tsx` (Client-side)**

* Displays tags as interactive badges.
* **Filtering behavior:**

  * Clicking a tag shows only posts with that tag.
  * Implemented via `classList.toggle('hidden')` on posts: `#__posts div[data-tag]`.
  * Active tag highlights with a green background.
* **Clear filter:**

  * A "Clear" badge resets all filters and shows all posts.
* **Persistence:**

  * Selected tag is stored in `localStorage` under `STORAGE_KEYS.TAG_KEY`.
  * Filter is reapplied on page reload.
* **UI enhancements:**

  * Custom horizontal scrollbar via `.scrollbar-custom`.
  * Overflow-x scrolling for tag row (`overflow-x-auto`) with responsive alignment (`justify-end md:justify-center`).
  * `title` attributes for badges improve accessibility.

### **Post Tagging**

* On the home page (`app/page.tsx`), each post item is assigned a `data-tag` attribute:

  ```tsx
  data-tag={firstTag || 'generic'}
  ```

  * `firstTag` is derived from `post.tags[0]`.
  * If no tags are present, a placeholder (`BLOG.PLACEHOLDER_BADGE`) is used.

### **Storage**

* `localStorage.tag_key` retains the currently selected tag.
* Cleared when the user clicks the "Clear" badge.

### **User Experience**

* Responsive horizontal scrolling for tags ensures usability on smaller screens.
* Clear visual feedback for active filters.
* Accessibility support with descriptive `title` attributes for each tag badge.

---


## **Daily tasks**

  

### **Day 1:**

  

* Migrated the project to **Vercel** and removed the old workflow.

* Updated build configuration for Vercel deployment.

* Added redirect from **GitHub Pages** to Vercel build.

* Added details to **README** about the migration process.

* Conducted **R&D** on Vercel integration.

  

### **Day 2:**

  

* Removed **Cloudworker**, replaced it with **Next.js API**.

* Implemented **Webhook** with a deploy hook for updates.

* **R&D** on **Incremental Static Regeneration (ISR)**; found a middle-ground solution using **On-demand ISR**.

  

### **Day 3:**

  

* Replaced the **build hook** with ISR via **revalidatePath** — now blog pages only revalidate when new posts are added, not based on time.

* Added **revalidatePath** for dynamic routes (`/[id]`) to revalidate pages when **Prismic** data changes.

* Updated webhook types for better **type safety**.

* R&D on **Next.js revalidation functions** like `revalidate`, `revalidatePath`, and `revalidateTag`.

* Enhanced **error handling** with a custom `notFound` function (needed because it's not default in App Router).

  

### **Day 4:**

  

* Optimized and bug-fixed **accessibility** issues, including 404, images, and buttons.

* Conducted **R&D** on **robots.txt**, **prefetch**, and **build analysis**.

* Worked in progress on **SEO** improvements.

  

### **Day 5:**

  

* Continued working on **SEO optimization**.

* **R&D** on **anonymous comments feature** (still a work in progress).

  

### **Day 6:**

  

* Tested **anonymous comments** functionality.

* Improved **metadata** and **configuration** for the application.

* Added a **formatDate** utility function to handle date formatting.

* Updated pages and layouts with formatting and linting.

  

### **Day 7:**

  

* Completed the **anonymous comments section**.

* Conducted **R&D** on **rate-limiting** and **DDoS protection**.

* Replaced **Vercel blob** with **NeonDB** for better storage and performance.

---
  

## **Security Measures**

* **Vercel Firewall**: Blocks AI bots, rate-limits POST requests.

* **localStorage**: Prevents multiple comments per post per user.

* **Sanitization**: Comments validated for content length and XSS using **DOMPurify** on both client and server sides.

* **Content Security Policy (CSP)**: Strict CSP headers configured in `RootLayout` to prevent XSS and code injection attacks.

* **Webhook Secret Validation**: Prismic webhook endpoint validates the secret using timing-safe comparison to prevent unauthorized revalidation.


## **Future Considerations**

  

* Automate moderation workflows.

* Introduce searchable posts.

* Monitor Neon DB usage.th and XSS using **DOMPur

* Analytics and insights on comment engagement.

* Server-side tag filtering for SEO/large post counts.

---



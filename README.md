# Blog POC

A proof-of-concept (POC) blog application built with *Next.js* and *Tailwind CSS*. The blog fetches content from **Prismic** and initially deployed static files to **GitHub Pages**. After feedback, the project has been migrated to **Vercel** for better scalability and alignment with enterprise standards.

---

### 🛠 **Initial Architecture**
Originally, the blog’s architecture used **GitHub Pages** for hosting and **Cloudflare Workers** as a relay to trigger GitHub rebuilds when content in **Prismic** was updated. Due to limitations with Prismic’s webhook system ([issue link](https://community.prismic.io/t/webhook-for-github/8908/21)) — specifically the lack of custom body support for GitHub triggers — I used **Cloudflare Workers** to bridge that gap and trigger the rebuild via **GitHub Actions**.

- **Prismic** as the CMS.
- **Cloudflare Workers** acted as a relay server to trigger rebuilds on **GitHub Actions**.
- Static files were deployed to **GitHub Pages**.

---

### 🌐 **Why the Switch to Vercel?**

In response to feedback and to better align with **enterprise deployment standards**, the application has been migrated to **Vercel** for the following reasons:

- **Enterprise Adoption**: **Vercel** is a widely used platform in enterprise environments and offers seamless integration with Next.js, automatic static regeneration, serverless functions, and a globally distributed CDN. 
- **Simplified Deployment Pipeline**: Migrating to **Vercel** removes the need for a custom **Cloudflare Worker**, as **Vercel** natively handles build triggers and static regeneration with minimal configuration, improving maintainability.
- **Built-in Static Regeneration**: Vercel supports **Incremental Static Regeneration (ISR)** out of the box, meaning content can be updated dynamically without requiring a full rebuild.
- **Scalability**: **Vercel** automatically scales based on demand, with minimal manual configuration, which makes it a better fit for growing projects.

---

### 🔄 **Migration Steps**
- **Deployment Pipeline**: The blog was migrated from **GitHub Pages** to **Vercel**. The project now deploys automatically when new commits are pushed to the main branch of the GitHub repository.
- **Removed Cloudflare Worker**: The **Cloudflare Worker** previously used to trigger rebuilds via GitHub Actions has been removed. **Vercel** now handles the static rebuild process automatically.
- **Preview Mode**: Integrated **Preview Mode** for Prismic, allowing drafts to be previewed before they go live, improving the content workflow.
- **Static Regeneration**: Enabled **Incremental Static Regeneration (ISR)** for the blog posts, ensuring that updates to content are reflected without requiring a full site rebuild, thus improving build times.

---

### 📅 **What’s Next?**
- **Future Enhancements**: Plan to add features such as **full-text search**, **dynamic filtering**, and **custom server-side logic** using Vercel’s edge functions.
- **Improved Caching & Performance**: Vercel's edge caching and optimization strategies will continue to be explored to enhance performance, especially as the number of blog posts increases.

---

### 📚 **Technical Details**
- **Prismic CMS**: Content is fetched dynamically from **Prismic** and displayed on the blog.
- **Vercel Deployment**: **Vercel** now handles automatic deployment and hosting of the blog.
- **Tailwind CSS**: The blog uses **Tailwind CSS** for styling, which offers a utility-first approach to building modern UIs.
- **shadcn/ui**: Components from **shadcn/ui** are used to build consistent and customizable UI elements, such as buttons, modals, and forms.

---

### 📝 **Change Log**
#### Migration to Vercel (Date)
- **Deployment**: Migrated from **GitHub Pages** to **Vercel** for easier and more efficient hosting and deployment management.
- **Static Regeneration**: Enabled **Incremental Static Regeneration (ISR)** for blog posts, so new content is reflected without full site rebuilds.
- **Custom Worker Removed**: Removed the custom **Cloudflare Worker** that previously triggered rebuilds. Vercel now automatically manages rebuilds and deployment.
- **Preview Mode**: Integrated **Prismic’s Preview Mode**, allowing for viewing draft content before it is published.

---

### 🛠 **Technical Notes for Developers**
- To deploy, connect the GitHub repository to **Vercel** and configure the **Prismic webhook** to trigger deployments when content is updated.
- Vercel’s automatic deployment and **Preview Mode** integrate seamlessly with **Prismic** to provide a smooth content publishing experience.
- **Vercel Edge Functions** and **ISR** features offer a more scalable and efficient architecture for static and dynamic content.

---

This **README** provides a clear record of the migration to **Vercel** and how it impacts the deployment process, performance, and scalability. It also outlines the technical improvements made with the migration and highlights next steps for further optimization and feature additions.

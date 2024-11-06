<script lang="ts">
  import { page } from '$app/stores'
  import { API_URL } from '$lib/api.js'

  $: hidden = $page.url.pathname === '/'
</script>

<nav>
  <a
    class="home"
    class:hidden
    aria-hidden={hidden}
    tabindex={hidden ? -1 : 0}
    aria-label="Go to home page"
    href="/"
  >
    <img
      src="{API_URL}/avatar?size=40"
      alt="BluDood Avatar"
      aria-hidden="true"
    />
    <span>BluDood</span>
  </a>

  <div class="links">
    <a href="/blog">Blog</a>
    <a href="/projects">Projects</a>
    <a href="/contact">Contact</a>
  </div>
</nav>

<style>
  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--border);
  }

  .home {
    display: flex;
    align-items: center;
    gap: 10px;
    color: inherit;
    text-decoration: none;
  }

  .home img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .home span {
    font-size: 20px;
  }

  nav a {
    transition: opacity 500ms ease;
    will-change: opacity;
  }

  nav .home.hidden {
    opacity: 0;
    pointer-events: none;
  }

  nav .links {
    display: flex;
    justify-content: flex-end;
    column-gap: 20px;
    flex-wrap: wrap;
  }

  nav .links a {
    color: inherit;
    text-decoration: none;
  }
</style>

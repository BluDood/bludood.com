<script lang="ts">
  import Loader from '$components/Loader.svelte'
  import { fetchPosts } from '$lib/api.js'

  import type { BlogPost } from '$types/blog.js'

  let posts: BlogPost[] | null = null

  fetchPosts().then(p => (posts = p))
</script>

<svelte:head>
  <title>BluDood - Blog</title>
  <meta name="description" content="BluDood - Blog" />
</svelte:head>

<h1>Posts</h1>

{#if posts}
  <div class="posts">
    {#each posts as post}
      <a
        target="_blank"
        href={`https://blog.bludood.com/${post.id}`}
        class="post"
      >
        <span class="title">{post.title}</span>
        <span>{new Date(post.created * 1000).toLocaleDateString()}</span>
        <span class="summary">{post.summary}</span>
      </a>
    {/each}
  </div>
{:else}
  <Loader defer />
{/if}

<style>
  .posts {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0 20px;
  }

  h1 {
    text-align: center;
    padding: 20px 0;
  }

  .posts {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    animation: appear 500ms ease forwards;
  }

  .post {
    display: flex;
    flex-direction: column;
    background: var(--background-sec);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    width: 350px;
    border: 1px solid transparent;
    transition: border 200ms ease;
  }

  @media screen and (max-width: 600px) {
    .posts {
      padding: 0 30px;
    }

    .post {
      width: 100%;
    }
  }

  .post:hover {
    border-color: var(--border-active);
  }

  .post .title {
    font-weight: 700;
    font-size: 20px;
  }

  .post .summary {
    opacity: 0.7;
  }
</style>

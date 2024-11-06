<script lang="ts">
  const year = new Date().getFullYear().toString()
</script>

<footer>
  <div class="copy">
    &copy; BluDood {year}
  </div>
  <div class="links">
    <a target="_blank" href="https://status.bludood.com"> Status </a>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border);
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }

  footer .links {
    display: flex;
    justify-content: flex-end;
  }

  footer a {
    color: var(--accent);
    text-decoration: none;
  }
</style>

<script lang="ts">
  import axios from 'axios'
  import Fa from 'svelte-fa'
  import { API_URL } from '$lib/api.js'

  import {
    faCheck,
    faEnvelope,
    faInfo,
    faSpinner,
    faTimes,
    faQuestionCircle
  } from '@fortawesome/free-solid-svg-icons'
  import { faDiscord } from '@fortawesome/free-brands-svg-icons'

  let sent = false
  let loading = false
  let status = {
    status: '',
    message: ''
  }

  let name = ''
  let email = ''
  let message = ''

  async function send() {
    if (loading || sent) return

    if (!email || !message)
      return (status = {
        status: 'error',
        message: 'Please fill out all required fields.'
      })

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g))
      return (status = {
        status: 'error',
        message: 'Please enter a valid email.'
      })

    loading = true
    const res = await axios.post(
      `${API_URL}/contact`,
      {
        name,
        email,
        message
      },
      { validateStatus: () => true }
    )
    loading = false
    if (res.status !== 200)
      return (status = { status: 'error', message: res.data })
    sent = true
    status = {
      status: 'success',
      message: "Sent! I'll respond as soon as possible"
    }
  }
</script>

<svelte:head>
  <title>BluDood - Contact</title>
  <meta name="description" content="BluDood - Contact" />
</svelte:head>

<h1>Contact Me</h1>
<div class="contact">
  <div class="options">
    <a
      data-brand="email"
      href="mailto:bludood@bludood.com"
      aria-label="Send me an email"
    >
      <Fa icon={faEnvelope} />
      <span>Email</span>
    </a>
    <a
      data-brand="discord"
      href="https://discord.bludood.com"
      aria-label="Join my Discord Server"
    >
      <Fa icon={faDiscord} />
      <span>Discord Server</span>
    </a>
    <a
      data-brand="support"
      href="https://support.bludood.com"
      aria-label="Create a support ticket on BluSupport"
    >
      <Fa icon={faQuestionCircle} />
      <span>BluSupport</span>
    </a>
  </div>
  {#if sent}
    <div data-status={status.status} class="message">
      <Fa
        icon={status.status === 'success'
          ? faCheck
          : status.status === 'info'
            ? faInfo
            : faTimes}
      />
      <span>{status.message}</span>
    </div>
  {:else}
    <div class="or">
      <div class="left"></div>
      <span>or</span>
      <div class="right"></div>
    </div>
    <div class="form" role="form" aria-label="Contact form">
      <input
        bind:value={name}
        disabled={loading}
        type="text"
        placeholder="Name (optional)"
      />
      <input
        bind:value={email}
        disabled={loading}
        type="email"
        placeholder="Email"
      />
      <textarea
        bind:value={message}
        disabled={loading}
        placeholder="Message"
      />
      {#if status.message}
        <div data-status={status.status} class="message">
          <Fa
            icon={status.status === 'success'
              ? faCheck
              : status.status === 'info'
                ? faInfo
                : faTimes}
          />
          <span>{status.message}</span>
        </div>
      {/if}
      <button on:click={send} disabled={loading}>
        {#if loading}
          <div class="load"><Fa icon={faSpinner} /></div>
        {:else}
          Send
        {/if}
      </button>
    </div>
  {/if}
</div>

<style>
  h1 {
    text-align: center;
    padding: 20px 0;
  }

  .contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: appear 500ms ease;
  }

  .options {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0 20px;
  }

  .options > a {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: inherit;
    text-decoration: none;
    border-radius: 5px;
    opacity: 0.9;
    transition: opacity 200ms ease;
  }

  .options > a:hover {
    opacity: 1;
  }

  .options > a > span {
    margin-bottom: 2px;
  }

  .options > a[data-brand='email'] {
    background-color: var(--email);
  }

  .options > a[data-brand='discord'] {
    background-color: var(--discord);
  }

  .options > a[data-brand='support'] {
    background-color: var(--accent);
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 85%;
    max-width: 600px;
  }

  .form > input,
  .form > textarea,
  .form > button {
    width: 100%;
    background: transparent;
    padding: 10px;
    font-size: 16px;
    color: inherit;
    border: 1px solid var(--border);
    border-radius: 5px;
    transition: 200ms ease;
    transition-property: border-color, background-color, color;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }

  .form > input:hover,
  .form > textarea:hover,
  .form > input:focus,
  .form > textarea:focus,
  .form > button:hover {
    border-color: var(--border-active);
  }

  .form > input:disabled,
  .form > textarea:disabled,
  .form > button:disabled {
    border-color: var(--border);
    background-color: var(--background-sec);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    color: var(--text-sec);
    cursor: not-allowed;
  }

  .form > textarea {
    resize: vertical;
    min-height: 100px;
  }

  .form > button {
    width: 40%;
    background-color: var(--background-sec);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    cursor: pointer;
  }

  .message {
    background-color: var(--background-sec);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    border-radius: 5px;
    display: flex;
    align-items: center;
    text-align: center;
    gap: 15px;
    margin: 10px;
    padding: 8px 16px;
  }

  .message[data-status='info'] {
    background: var(--blue);
  }

  .message[data-status='error'] {
    background: var(--red);
  }

  .message[data-status='success'] {
    background: var(--green);
  }

  .load {
    animation: spin 1s linear infinite;
  }

  .or {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 85%;
    max-width: 600px;
    margin: 20px 0;
  }

  .or > div {
    height: 1px;
    width: 100px;
    background-color: var(--border);
  }
</style>

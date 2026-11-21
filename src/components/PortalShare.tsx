import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Share2, X } from 'lucide-react';

type ShareContent = { title: string; text: string; url: string; image: string };
const origin = 'https://www.servicosnobairro.com.br';
const defaultImage = origin + '/og-image.png';
const trustedHosts = new Set(['www.servicosnobairro.com.br', 'servicosnobairro.com.br']);
const extensions: Record<string, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' };

function portalUrl(input: string) {
  try {
    const value = new URL(input, origin);
    if (value.protocol === 'https:' && trustedHosts.has(value.hostname) && !value.port && !value.username && !value.password) {
      return origin + value.pathname;
    }
  } catch { /* Fall back to known public content. */ }
  return null;
}

function currentContent(path: string): ShareContent {
  const meta = (key: string) => document.querySelector<HTMLMetaElement>('meta[property="' + key + '"]')?.content || '';
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || '';
  const title = (meta('og:title') || document.title || 'Serviços no Bairro').trim().slice(0, 160);
  return {
    title,
    text: 'Confira no Serviços no Bairro: ' + title,
    url: portalUrl(canonical) || portalUrl(path) || origin + '/',
    image: portalUrl(meta('og:image')) || defaultImage,
  };
}

export function PortalShare() {
  const { pathname } = useLocation();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const manual = useRef<HTMLTextAreaElement>(null);
  const [share, setShare] = useState<ShareContent | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => { if (dialog.current?.open) dialog.current.close(); }, [pathname]);

  useEffect(() => {
    if (!share) return;
    const { image } = share;
    const controller = new AbortController();
    const loadImage = async () => {
      const local = new URL(image).pathname;
      const response = await fetch(local, { credentials: 'omit', signal: controller.signal, redirect: 'error' });
      if (!response.ok) return;
      const blob = await response.blob();
      const ext = extensions[blob.type];
      if (ext && blob.size > 0 && blob.size <= 8 * 1024 * 1024 && !controller.signal.aborted) {
        setFile(new File([blob], 'servicos-no-bairro.' + ext, { type: blob.type }));
      }
    };
    void loadImage().catch(() => { /* The image link remains available. */ });
    return () => controller.abort();
  }, [share]);

  const open = () => {
    setFile(null);
    setStatus('');
    setShare(currentContent(pathname));
    dialog.current?.showModal();
  };

  const close = () => {
    setShare(null);
    setFile(null);
    setStatus('');
    trigger.current?.focus();
  };

  const complete = share ? share.text + '\n' + share.url : '';
  const hasNativeImage = !!(file && typeof navigator !== 'undefined' && navigator.share && navigator.canShare?.({ files: [file] }));
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(complete);
      setStatus('Texto e link copiados.');
    } catch {
      manual.current?.focus();
      manual.current?.select();
      setStatus('Texto selecionado para você copiar.');
    }
  };
  const nativeShare = async () => {
    if (!share || !file || !hasNativeImage) return;
    try { await navigator.share({ title: share.title, text: complete, files: [file] }); }
    catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) setStatus('Não foi possível enviar a imagem. Você pode baixar a imagem e copiar o texto.'); }
  };

  const link = (address: string, params: Record<string, string>) => address + '?' + new URLSearchParams(params).toString();
  const networks = share ? [
    ['WhatsApp', link('https://wa.me/', { text: complete })],
    ['Facebook', link('https://www.facebook.com/sharer/sharer.php', { u: share.url })],
    ['X', link('https://twitter.com/intent/tweet', { text: share.text, url: share.url })],
    ['Pinterest', link('https://www.pinterest.com/pin/create/button/', { url: share.url, media: share.image, description: share.text })],
    ['LinkedIn', link('https://www.linkedin.com/sharing/share-offsite/', { url: share.url })],
    ['Threads', link('https://www.threads.com/intent/post', { text: share.text, url: share.url })],
  ] : [];
  const action = 'flex min-h-12 items-center justify-center rounded-lg border border-slate-300 px-2 text-center text-sm font-semibold text-slate-900 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800';

  return <>
    <button type="button" ref={trigger} onClick={open} aria-haspopup="dialog" aria-label="Compartilhar" className="fixed bottom-4 left-4 z-40 flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800">
      <Share2 size={20} aria-hidden="true" /><span className="hidden sm:inline">Compartilhar</span>
    </button>
    <dialog ref={dialog} onClose={close} aria-labelledby="portal-share-title" className="fixed inset-x-0 bottom-0 top-auto m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-sm overflow-auto rounded-2xl bg-white p-5 text-slate-950 shadow-xl backdrop:bg-black/40 sm:inset-y-0 sm:left-4 sm:right-auto" onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close(); } }}>
      {share && <>
        <div className="flex items-center justify-between gap-2">
          <h2 id="portal-share-title" className="text-lg font-bold">Recomendar esta página</h2>
          <button type="button" aria-label="Fechar compartilhamento" onClick={() => dialog.current?.close()} className="grid h-12 w-12 shrink-0 place-items-center rounded-lg hover:bg-slate-100 focus-visible:outline focus-visible:outline-2"><X aria-hidden="true" size={20} /></button>
        </div>
        <img src={new URL(share.image).pathname} alt="Prévia da imagem de compartilhamento" width={1200} height={630} className="mb-3 aspect-[1200/630] w-full rounded-lg border border-slate-200 object-cover" onError={event => { if (!event.currentTarget.src.endsWith('/og-image.png')) event.currentTarget.src = '/og-image.png'; }} />
        <div className="grid grid-cols-2 gap-2">
          {networks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={action}>{label}</a>)}
        </div>
        <button type="button" onClick={copy} className={action + ' mt-3 w-full border-orange-700 bg-orange-700 text-white hover:bg-orange-800'}>Copiar texto e link</button>
        <label className="mt-2 block text-xs font-semibold" htmlFor="portal-share-copy">Texto e link</label>
        <textarea ref={manual} id="portal-share-copy" className="mt-1 w-full rounded border border-slate-300 p-2 text-xs" readOnly rows={3} value={complete} />
        <div className="mt-2 grid gap-2">
          {hasNativeImage && <button type="button" className={action} onClick={nativeShare}>Compartilhar imagem e texto</button>}
          <a className={action} download href={new URL(share.image).pathname}>Baixar imagem</a>
        </div>
        <p className="mt-2 text-xs text-slate-700">Pinterest recebe a imagem. Nos outros apps, a prévia depende da plataforma. Se o app não aceitar anexos, baixe a imagem e cole o texto.</p>
        <p className="mt-1 text-sm text-slate-800" role="status">{status}</p>
      </>}
    </dialog>
  </>;
}

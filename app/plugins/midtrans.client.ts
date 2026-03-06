export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  if (document.getElementById("midtrans-script")) return;

  const script = document.createElement("script");
  script.id = "midtrans-script";
  script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
  script.setAttribute(
    "data-client-key",
    config.public.MIDTRANS_CLIENT_KEY as string,
  );
  script.async = true;

  document.head.appendChild(script);
});

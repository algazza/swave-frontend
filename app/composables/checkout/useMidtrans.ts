export const useMidtrans = () => {

  const waitSnap = () =>
    new Promise<void>((resolve) => {
      const check = () => {
        if (window.snap) resolve();
        else setTimeout(check, 100);
      };

      check();
    });

  const pay = async (token: string) => {
    await waitSnap();

    return new Promise((resolve, reject) => {
      window.snap.pay(token, {
        onSuccess: resolve,
        onPending: resolve,
        onError: reject,
        onClose: () => console.log("user closed popup"),
      });
    });
  };

  return { pay };
};

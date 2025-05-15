document.addEventListener('DOMContentLoaded', () => {
  const scForm = document?.querySelector('.cyprus-lifestyle__form');
  const scInput = document?.querySelector('.cyprus-lifestyle__input');
  const scLink = document?.querySelector('.cyprus-lifestyle__form-link');

  if (scForm) {
    scForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const code = scInput.value.toLowerCase();

      try {
        scForm.querySelector('span').classList.remove('hide')
        const res = await fetch(
          'https://stellar-blini-2e01cb.netlify.app/.netlify/functions/checkCode',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          }
        );


        const data = await res.json();

        if (res.ok && data.link) {
            if (
              document
                .querySelector('.cyprus-lifestyle__form-wrong')
                .classList.contains('active')
            )
              document
                .querySelector('.cyprus-lifestyle__form-wrong')
                .classList.remove('active');

            scForm.classList.add('hide');
            scForm.querySelector('span').classList.add('hide')

            document
              .querySelector('.cyprus-lifestyle__promo')
              .classList.add('success');

            scLink.querySelector('a').href = 'https://' + data.link;
            scLink.classList.add('active');
        } else {
          document
              ?.querySelector('.cyprus-lifestyle__form-wrong')
              .classList.add('active');
          scForm.querySelector('span').classList.add('hide')
        }
      } catch (err) {
        console.error(err);
        scForm.querySelector('span').classList.add('hide')
      }
    });
  }
});

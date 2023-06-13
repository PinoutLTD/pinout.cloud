<template>
  <Layout>
    <h1 class="visually-hidden">PINOUT LTD - we build Smart Home Solutions</h1>
    <section class="main-page">
      <!-- left side -->
      <div class="main-page-left">
        <header class="header">
          <g-link to="/" class="header__logo">
            <g-image src="@/assets/images/logo.svg" alt="logo" />
          </g-link>
          <div class="header__slogan">
            <g-image src="@/assets/images/waves-on.svg" alt="decor" aria-hidden/>
            <p>We build Smart Home Solutions based on open source software</p>
          </div>
        </header>
        <div class="main-page-left__wrapper">
          <h2 class="title main-page__title">
            <span>Make your home</span>
            <span class="big">as smart</span>
            <span>as your smartphone</span>
          </h2>
          <div class="main-page__email">
            email us: <g-link class="link" to="mailto:info@pinout.cloud ">info@pinout.cloud </g-link> 
          </div>
        </div>
        <div class="main-page__contacts">
          <address>
            Georgiou A, 83 <br>
            SHOP 17 <br>
            Germasogeia, 4047, Limassol, Cyprus 
          </address>
        </div>
      </div>
      <!-- right side -->
      <div class="main-page-right">
        <div class="bg">
          <g-image src="@/assets/images/decor.svg" alt="decor" aria-hidden/>
        </div>
        <g-image class="img" src="@/assets/images/photo.png" alt="smart home"/>
      </div>
    </section>
  </Layout>
</template>

<script>
export default {
}
</script>

<style scoped>

  .main-page {
    display: flex;
    justify-content: space-between;
    /* margin-bottom: 0; */
  }

  .main-page-left {
    margin-right: var(--space);
  }


  .header {
    display: flex;
    /* align-items: center; */
  }

  .header__logo {
    max-width: 170px;
    width: 100%;
    margin-right: calc(var(--space) * 3);
  }

  .header__slogan {
    position: relative;
  }

  .header__slogan::before  {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12.906' height='12.906' viewBox='0 0 12.906 12.906'%3E%3Cpath d='M966.453,71.992a7.688,7.688,0,0,1-6.624-6.623,7.7,7.7,0,0,1-6.282,6.589c0,.022,0,.047.007.069a7.716,7.716,0,0,1,6.24,6.241c.023,0,.047,0,.07.007A7.7,7.7,0,0,1,966.453,71.992Z' transform='translate(-953.547 -65.369)' fill='%23fff'/%3E%3C/svg%3E");
    position: absolute;
    top: -20px;
    right: -20px;
    width: 12px;
    height: 12px;
  }

  .header__slogan::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80.336' height='90.036' viewBox='0 0 80.336 90.036'%3E%3Cg transform='translate(-903.649 -209.468)'%3E%3Cg %3E%3Cpath d='M932.5,229.512a3.584,3.584,0,0,0,3.58-3.579V213.047a3.58,3.58,0,0,0-7.16,0v12.886A3.584,3.584,0,0,0,932.5,229.512Zm-1.431-16.465a1.431,1.431,0,1,1,2.863,0v12.886a1.431,1.431,0,1,1-2.863,0Z' fill='%23fff'/%3E%3Cpath d='M928.921,263.592a3.58,3.58,0,1,0,7.16,0V250.707a3.58,3.58,0,1,0-7.16,0Zm2.149-12.885a1.431,1.431,0,1,1,2.863,0v12.885a1.431,1.431,0,1,1-2.863,0Z' fill='%23fff'/%3E%3Cpath d='M950.372,216.87a3.562,3.562,0,0,0-2.532,1.048l-9.111,9.113a3.579,3.579,0,1,0,5.062,5.061l9.112-9.113a3.579,3.579,0,0,0-2.531-6.109Zm-10.124,13.7a1.429,1.429,0,0,1,0-2.024l9.112-9.113a1.432,1.432,0,0,1,2.025,2.025l-9.112,9.112A1.464,1.464,0,0,1,940.248,230.573Z' fill='%23fff'/%3E%3Cpath d='M927.322,247.079a3.58,3.58,0,0,0-6.111-2.531l-9.112,9.111a3.579,3.579,0,0,0,5.061,5.062l9.113-9.11A3.558,3.558,0,0,0,927.322,247.079Zm-2.567,1.013-9.112,9.111a1.464,1.464,0,0,1-2.025,0,1.429,1.429,0,0,1,0-2.025l9.111-9.111a1.432,1.432,0,0,1,2.025,2.025Z' fill='%23fff'/%3E%3Cpath d='M941.309,238.32a3.584,3.584,0,0,0,3.579,3.579h12.885a3.579,3.579,0,1,0,0-7.158H944.888A3.584,3.584,0,0,0,941.309,238.32Zm17.9,0a1.435,1.435,0,0,1-1.434,1.432H944.888a1.431,1.431,0,0,1,0-2.863h12.885A1.434,1.434,0,0,1,959.207,238.32Z' fill='%23fff'/%3E%3Cpath d='M907.229,241.9h12.885a3.579,3.579,0,1,0,0-7.158H907.229a3.579,3.579,0,1,0,0,7.158Zm0-5.01h12.885a1.431,1.431,0,0,1,0,2.863H907.229a1.431,1.431,0,0,1,0-2.863Z' fill='%23fff'/%3E%3Cpath d='M921.211,232.092a3.579,3.579,0,1,0,5.062-5.061l-9.111-9.113a3.579,3.579,0,0,0-6.111,2.532,3.549,3.549,0,0,0,1.048,2.529Zm-7.592-12.656a1.434,1.434,0,0,1,2.024,0l9.112,9.113a1.434,1.434,0,0,1,0,2.024,1.464,1.464,0,0,1-2.025,0l-9.112-9.112a1.429,1.429,0,0,1,0-2.025Z' fill='%23fff'/%3E%3Cpath d='M983.761,263.691a1.431,1.431,0,0,0-.852-1.147l-41.926-18.135a1.433,1.433,0,0,0-1.99,1.5l5.747,45.318a1.432,1.432,0,0,0,2.279.964l10.5-7.886,10.993,14.633a1.436,1.436,0,0,0,2.006.285l12.9-9.691a1.429,1.429,0,0,0,.284-2L972.7,272.89,983.2,265A1.427,1.427,0,0,0,983.761,263.691Zm-13.923,7.771a1.435,1.435,0,0,0-.285,2l11,14.633-10.609,7.969-10.993-14.633a1.432,1.432,0,0,0-2.006-.284l-9.672,7.266-5.119-40.383,37.36,16.16Z' fill='%23fff'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    position: absolute;
    bottom: -86px;
    right: -56px;
    width: 80px;
    height: 90px;
  }

  .header__slogan p {
    max-width: 524px;
    font-size: calc(var(--base-font-size) * 1.1);
  }

  .main-page-left__wrapper {
    padding-top: calc(var(--space) * 6);
    position: relative;
    display: inline-flex;
    flex-direction: column;
    margin-bottom: calc(var(--space) * 4);
  }

  .main-page__title {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: calc(var(--space) * 0.3);
    font-family: var(--font-family-title);
    line-height: 1.1;
    color: var(--color-title)
  }

  .main-page__title::before  {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='27.526' height='27.524' viewBox='0 0 27.526 27.524'%3E%3Cpath d='M50.175,401.3A16.4,16.4,0,0,1,36.048,387.18a16.427,16.427,0,0,1-13.4,14.052c.008.048.006.1.015.148a16.458,16.458,0,0,1,13.309,13.309c.049.009.1.007.148.015A16.428,16.428,0,0,1,50.175,401.3Z' transform='translate(-22.649 -387.18)' fill='%23fff'/%3E%3C/svg%3E");
    position: absolute;
    top: -50px;
    left: -2rem;
    width: 12px;
    height: 12px;
  }

  .main-page__title .big {
    font-size: calc(var(--base-font-size) * 5);
  }

  .main-page__title span:last-of-type {
    font-size: calc(var(--base-font-size) * 2.2);
  }

  .main-page__email {
    align-self: flex-end;
    text-decoration: underline;
  }

  .main-page__contacts {
    position: relative;
  }

  .main-page__contacts::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 43.63 72.6'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fff;%7D%3C/style%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='BACKGROUND'%3E%3Cpath class='cls-1' d='M43,27A21.82,21.82,0,1,0,.62,27,32.33,32.33,0,0,0,3,35.46C5.14,40,14.16,54.83,18.31,61.6c-5.6.71-8.2,3.12-8.2,5.39,0,2.7,3.66,5.61,11.71,5.61s11.7-2.91,11.7-5.61c0-2.27-2.6-4.68-8.2-5.39C29.47,54.83,38.49,40,40.63,35.46A32.33,32.33,0,0,0,43,27ZM30.15,67c-.23.64-3,2.24-8.33,2.24S13.64,67.59,13.48,67c.15-.56,2.45-1.93,6.79-2.21l.11.18a1.69,1.69,0,0,0,2.87,0l.11-.18C27.65,65.07,29.94,66.42,30.15,67ZM6,34a30.28,30.28,0,0,1-2.11-7.65.69.69,0,0,0,0-.13,18.23,18.23,0,0,1-.54-4.41,18.45,18.45,0,1,1,36.89,0,18.23,18.23,0,0,1-.54,4.41c0,.05,0,.09,0,.13A30.28,30.28,0,0,1,37.59,34c-2.16,4.55-12,20.77-15.77,26.87C18.08,54.78,8.21,38.56,6,34Z'/%3E%3Cpath class='cls-1' d='M21.82,9.48a11.71,11.71,0,1,0,11.7,11.71A11.72,11.72,0,0,0,21.82,9.48ZM13.48,21.19a8.34,8.34,0,1,1,8.34,8.34A8.35,8.35,0,0,1,13.48,21.19Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    position: absolute;
    top: -70px;
    left: -32px;
    width: 42px;
    height: 72px;
  }

  .main-page__contacts::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='129.776' height='48.757' viewBox='0 0 129.776 48.757'%3E%3Cg transform='translate(-123.267 -984.213)'%3E%3Cg%3E%3Ccircle cx='5.725' cy='5.725' r='5.725' transform='translate(123.267 984.213)' fill='%23fff'/%3E%3Ccircle cx='5.725' cy='5.725' r='5.725' transform='translate(162.708 984.213)' fill='%23fff'/%3E%3Ccircle cx='5.725' cy='5.725' r='5.725' transform='translate(202.15 984.213)' fill='%23fff'/%3E%3Cpath d='M253.043,989.939a5.726,5.726,0,1,1-5.726-5.726A5.726,5.726,0,0,1,253.043,989.939Z' fill='%23fff'/%3E%3C/g%3E%3Cg%3E%3Cpath d='M134.717,1027.245a5.725,5.725,0,1,1-5.725-5.725A5.725,5.725,0,0,1,134.717,1027.245Z' fill='%23fff'/%3E%3Cpath d='M174.159,1027.245a5.726,5.726,0,1,1-5.725-5.725A5.725,5.725,0,0,1,174.159,1027.245Z' fill='%23fff'/%3E%3Cpath d='M213.6,1027.245a5.726,5.726,0,1,1-5.726-5.725A5.725,5.725,0,0,1,213.6,1027.245Z' fill='%23fff'/%3E%3Cpath d='M253.043,1027.245a5.726,5.726,0,1,1-5.726-5.725A5.726,5.726,0,0,1,253.043,1027.245Z' fill='%23fff'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    position: absolute;
    bottom: -70px;
    left: 0px;
    width: 130px;
    height: 48px;
  }

  .main-page__contacts address {
    font-style: normal;
    line-height: 1.4;
    font-size: calc(var(--base-font-size) * 1.2);
  }

  .main-page-right {
    position: relative;
    max-width: 880px;
    width: 100%;
  }

  .main-page-right::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='62.67' height='174.962' viewBox='0 0 62.67 174.962'%3E%3Cg transform='translate(-1827.327 -789.461)'%3E%3Cpath d='M1890,802.94l-62.67,13.479V802.94L1890,789.461Z' fill='%23fff'/%3E%3Cpath d='M1890,839.941l-62.67,13.479V839.941L1890,826.462Z' fill='%23fff'/%3E%3Cpath d='M1890,876.942l-62.67,13.479V876.942L1890,863.463Z' fill='%23fff'/%3E%3Cpath d='M1890,913.943l-62.67,13.479V913.943L1890,900.464Z' fill='%23fff'/%3E%3Cpath d='M1890,950.944l-62.67,13.479V950.944L1890,937.464Z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E");
    position: absolute;
    bottom: 40px;
    right: -50px;
    width: 62px;
    height: 174px;
  }

  .main-page-right .bg {
    position: absolute;
    top: -12px;
    left: 128px;
    z-index: 0;
  }

  .main-page-right .img {
    position: relative;
    z-index: 3;
  }

  @media screen and (max-width: 1460px) {
    .main-page-left {
      width: 100%;
    }

    .main-page-right {
      align-self: center;
    }
  }

  @media screen and (max-width: 1080px) {
    .main-page {
      flex-direction: column;
    }

    .main-page-left {
      margin-right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: calc(var(--space) * 6);
    }

    .main-page-left__wrapper {
      padding-top: calc(var(--space) * 3);
      display: flex;
      align-items: center;
    }

    .main-page__title  {
      text-align: center;
    }

    .main-page__email {
      align-self: center;
    }

    .main-page {
      margin-bottom: 0;
    }

    .main-page__contacts {
      text-align: center;
    }

    .main-page__contacts::before,
    .main-page__contacts::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media screen and (max-width: 630px) {
    .header {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 420px) {
    .main-page__title .big {
      font-size: calc(var(--base-font-size) * 3);
    }
  }

  
</style>

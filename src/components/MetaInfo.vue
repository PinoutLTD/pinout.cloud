<template></template>
  
<static-query>
query {
  metadata {
    siteName
    siteUrl
  }
}
</static-query>


<script>
export default {
  props: {
      pageTitle: { type: String, default: '' },
      pageDescription: { type: String, default: '' },
      pageImage: { type: String, default: '' },
      pageImageWidth: { type: String, default: '1280' },
      pageImageHeight: { type: String, default: '765' },
  },

  computed: {
    image() {
      if(this.pageImage != '') {
        return this.$static.metadata.siteUrl + this.metaImage;
      }
      else{
        return this.$static.metadata.siteUrl + '/og.png'
      }
    },

    url(){
      return this.$static.metadata.siteUrl + this.$route.fullPath
    },

    googleInfo() {

        return  [{
          type: 'application/ld+json',
          json: {
            '@context': 'http://schema.org',
            '@type': 'Organization',
            logo: "https://pinout.cloud/static/logo.svg",
            name: "Pinout LTD, Smart Solutions for your Home",
            description: "We build Smart Home Solutions based on open source software. Make your home as smart as your smartphone.",
            provider: {
              '@type': "Organization",
              name: "Pinout LTD, Smart Solutions for your Home",
              sameAs: "https://pinout.cloud/"
            },
            headline: this.pageTitle,
            image: this.image,
            email: "info@pinout.cloud",
            url: "https://pinout.cloud/",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Georgiou A, 83 - SHOP 17",
              addressLocality: "Limassol",
              postalCode: "4047",
              addressCountry: "Cyprus"
            },

          }
        }]
    },
  },

  metaInfo() {
    const title =  this.pageTitle + ' / ' + this.$static.metadata.siteName;
    const description = this.pageDescription;
    const image = this.image;
    return {
      title: title,
      htmlAttrs: {
        lang: 'en',
        amp: true
      },
      meta: [
        { key: 'description', name: 'description', content: description },

        // Some Open Graph Tags
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: this.$static.metadata.siteName },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:image:width", content: this.pageImageWidth },
        { property: "og:image:height", content: this.pageImageHeight },
        { property: "og:url", content: this.url },

        // Some Twitter Cards Tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:image", content: image},
        { name: "twitter:description", content: description },
      ],
      script: this.googleInfo
    };
  }
};
</script>
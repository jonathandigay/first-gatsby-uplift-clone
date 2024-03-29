import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, lang, meta }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )
  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  return (
    <Helmet
      htmlAttributes={{ lang, }}
      title={defaultTitle}
      meta={[
        { name: `description`, content: metaDescription, },
        { property: `og:title`, content: defaultTitle, },
        { property: `og:description`, content: metaDescription, },
        { property: `og:type`, content: `website`, },
        { name: `twitter:card`, content: `summary`, },
        { name: `twitter:creator`, content: site.siteMetadata?.author || ``, },
        { name: `twitter:title`, content: defaultTitle, },
        { name: `twitter:description`, content: metaDescription, },
      ].concat(meta)}

    >
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" referrerpolicy="no-referrer" />
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [{
    name: `author`,
    content: "Jonathan Digay",
  }],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo

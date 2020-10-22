import PageLayout from "../../components/PageLayout"
import { Row, Col } from "react-bootstrap"
import moment from "moment"
import { useRouter } from "next/router"
import ErrorPage from "next/error"
import { getBlogBySlug, getAllBlogs } from "../../lib/api"
import BlogHeader from "../../components/BlogHeader"
import BlogContent from "../../components/BlogContent"
import { urlFor } from "../../lib/api"

const BlogDetail = ({ blog }) => {
  const router = useRouter()

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404" />
  }

  if (router.isFallback) {
    return <PageLayout className="blog-detail-page">Loading...</PageLayout>
  }
  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader title={blog.title} subtitle={blog.subtitle} coverImage={urlFor(blog.coverImage).height(600).url()} date={moment(blog.date).format("LLL")} author={blog.author} />
          <hr />
          {blog.content && <BlogContent content={blog.content} />}
        </Col>
      </Row>
    </PageLayout>
  )
}

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.slug)
  return {
    props: { blog }
  }
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs()
  return {
    paths: blogs?.map(blog => ({ params: { slug: blog.slug } })),
    fallback: true
  }
}

export default BlogDetail

import { Row, Button } from "react-bootstrap"
import { useState } from "react"
import PageLayout from "../components/PageLayout"
import BloggerIntro from "../components/BloggerIntro"

import FilterButtons from "../components/FilterButtons"

import { useGetBlogPages } from "../actions/pagination"

import { getPaginatedBlogs } from "../lib/api"

export default function Home({ blogs }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 }
  })

  //loadMore: to load more data
  //isLoadingMore: true, whenever making a request to fetch data
  //isReachingEnd: true when loaded all data, data is empty (empty array)

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogPages({ blogs, filter })

  return (
    <PageLayout>
      <BloggerIntro />
      <FilterButtons
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value })
        }}
      />
      <hr />
      <Row className="mb-5">{pages}</Row>
      <div style={{ textAlign: "center" }}>
        <Button onClick={loadMore} disabled={isLoadingMore || isReachingEnd} variant="outline-secondary" size="lg">
          {isLoadingMore ? "..." : isReachingEnd ? "No More Blogs" : "Load More Blogs"}
        </Button>
      </div>
    </PageLayout>
  )
}

//called during build time, provides props to page, creates static page
export async function getStaticProps() {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" })
  return {
    props: {
      blogs
    }
  }
}

//static page: created at build time, when making requests, we receive the same html doc, faster, can be cached using CDN
//dynamic page : created at request time, can fetch data at server, slower, depends on the data fetched

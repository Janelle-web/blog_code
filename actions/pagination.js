import { useSWRPages } from "swr"
import moment from "moment"
import { Col } from "react-bootstrap"

import { useGetBlogs } from "./index"
import CardListItem from "../components/CardListItem"
import CardItem from "../components/CardItem"
import CardItemHolder from "../components/CardItemHolder"
import CardListItemHolder from "../components/CardListItemHolder"

const BlogList = ({blog, filter}) => {
  return paginatedBlogs.map(blog =>
    filter.view.list ? (
      <Col key={`${blog.slug}-list`} md="10">
        <CardListItem
          title={blog.title}
          subtitle={blog.subtitle}
          date={moment(blog.date).format("LL")}
          author={blog.author}
          link={{
            href: "/blogs/[slug]",
            as: `/blogs/${blog.slug}`
          }}
        />
      </Col>
    ) : (
      <Col key={blog.slug} md="6" lg="4">
        <CardItem
          title={blog.title}
          subtitle={blog.subtitle}
          date={moment(blog.date).format("LL")}
          image={blog.coverImage}
          author={blog.author}
          link={{
            href: "/blogs/[slug]",
            as: `/blogs/${blog.slug}`
          }}
        />
      </Col>
    )
}

export const useGetBlogPages = ({ blogs, filter }) => {
  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      const { data: paginatedBlogs, error } = withSWR(useGetBlogs({ offset, filter }))

      if (!offset && !paginatedBlogs && !error) {
        return <BlogList blogs={blogs} filter={filter} />
      }

      if (!paginatedBlogs) {
        return Array(3)
          .fill(0)
          .map((_, i) =>
            filter.view.list ? (
              <Col key={i} md="10">
                <CardListItemHolder />
              </Col>
            ) : (
              <Col key={`${i}-item`} md="6" lg="4">
                <CardItemHolder />
              </Col>
            )
          )
      }

      return <BlogList blogs={paginatedBlogs} filter={filter} />
      
    },
    //computing offset passed into previous callback function with 'withSWR'
    //SWR: data to get from "withSWR" function, index num of current page
    (SWR, index) => {
      if (SWR.data && SWR.data.length === 0) {
        return null
      }
      return (index + 1) * 6
    },
    [filter]
  )
}

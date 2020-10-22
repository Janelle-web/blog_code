import { useEffect } from "react"
import { useSWRPages } from "swr"
import moment from "moment"
import { Col } from "react-bootstrap"

import { useGetBlogs } from "./index"
import CardListItem from "../components/CardListItem"
import CardItem from "../components/CardItem"
import CardItemHolder from "../components/CardItemHolder"
import CardListItemHolder from "../components/CardListItemHolder"

export const useGetBlogPages = ({ blogs, filter }) => {
  useEffect(() => {
    window.___pagination__init = true
  }, [])
  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      let initialData = !offset && blogs

      if (typeof window !== "undefined" && window.___pagination__init) {
        initialData = null
      }

      const { data: paginatedBlogs } = withSWR(useGetBlogs({ offset, filter }, initialData))

      if (!paginatedBlogs) {
        return Array(3)
          .fill(0)
          .map((_, i) =>
            filter.view.list ? (
              <Col key={i} md="10">
                <CardListItemHolder />
              </Col>
            ) : (
              <Col key={`${i}-item`} md="4">
                <CardItemHolder />
              </Col>
            )
          )
      }

      return paginatedBlogs.map(blog =>
        filter.view.list ? (
          <Col key={`${blog.slug}-list`} md="10">
            <CardListItem
              title={blog.title}
              subtitle={blog.subtitle}
              date={moment(blog.date).format("LLL")}
              author={blog.author}
              link={{
                href: "/blogs/[slug]",
                as: `/blogs/${blog.slug}`
              }}
            />
          </Col>
        ) : (
          <Col key={blog.slug} md="4">
            <CardItem
              title={blog.title}
              subtitle={blog.subtitle}
              date={moment(blog.date).format("LLL")}
              image={blog.coverImage}
              author={blog.author}
              link={{
                href: "/blogs/[slug]",
                as: `/blogs/${blog.slug}`
              }}
            />
          </Col>
        )
      )
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

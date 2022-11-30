import { NextPage } from "next"

function ErrorClient() {
  return (<p>A Client Error has Occured</p>)
}

function ErrorServer() {
  return (<p>A Server Error has Occured</p>)
}

function Error({ statusCode }: {
  statusCode: number
}) {
  if(statusCode) {
    return ErrorServer
  } else {
    return ErrorClient
  }
}

Error.getInitialProps = ({ res, err }: any) => {
  let statusCode = res ? res.statusCode : (err ? err.statusCode : 404)
  return { statusCode }
}

export default Error
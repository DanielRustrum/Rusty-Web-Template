import { PageDataType, SetLayoutType } from "./_layout"

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
  return {
    statusCode: res ? res.statusCode : (err ? err.statusCode : 404)
  }
}

const errorData: PageDataType = {
  title: "An Error has Occured"
}

const errorLayout:SetLayoutType = (page, _) => <>{page}</>

export default Error
Error.setData = errorData
Error.setLayout = errorLayout
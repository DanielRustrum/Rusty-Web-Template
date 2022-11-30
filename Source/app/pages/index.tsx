import { createUseStyles } from 'react-jss'
import { trpc } from 'services/trpc/trpc'
import demoData from 'data/demo'

//@ts-ignore Styles
import styles from 'page-styles/index' 

const useStyles = createUseStyles({
  container: {
    marginTop: 100,
    textAlign: 'center',
  },

  header: {
    fontSize: 24,
    lineHeight: 1.25,
  },
})

export default function IndexPage() {
  const classes = useStyles()
  const query = trpc.demo.hello.useQuery({text: "Rusty!"}).data?.greeting

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>
        Example on how to use react-jss with Next.js
      </h1>
      <p className={styles.jsonViewer}>Data: {JSON.stringify(demoData)}</p>
      <p>Query: {query}</p>
    </div>
  )
}

IndexPage.setData = () => {return{
  title: "Rusty Web Template - Home"
}}
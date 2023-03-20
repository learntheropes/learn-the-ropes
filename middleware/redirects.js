export default ({ route, redirect }) => {
  if (!route.path.endsWith('/')) {
    const { path, query, hash } = route
    const newPath = `${path}/`
    return redirect({ path: newPath, query, hash })
  }
}
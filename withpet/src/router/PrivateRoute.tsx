import React from 'react'
import { Navigate } from 'react-router-dom'

type RouteProps = {
  authenticated: boolean
  component: React.ComponentType
  page: string
}

const PrivateRoute: React.FC<RouteProps> = ({
  authenticated,
  component: Component,
  page,
}) => {
  return <>{authenticated ? Component : <Navigate to={page} />}</>
}

export default PrivateRoute

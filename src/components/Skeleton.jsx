import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = props => (
  <ContentLoader
    speed={2}
    width={280}
    height={532}
    viewBox='0 0 280 532'
    backgroundColor='#f2f2f2'
    foregroundColor='#f5f5f5'
    {...props}
  >
    <rect x='6' y='10' rx='100%' ry='100%' width='248' height='248' />
    <rect x='0' y='288' rx='4' ry='4' width='260' height='28' />
    <rect x='2' y='376' rx='6' ry='6' width='256' height='34' />
    <rect x='2' y='420' rx='6' ry='6' width='80' height='34' />
    <rect x='90' y='420' rx='6' ry='6' width='80' height='34' />
    <rect x='178' y='420' rx='6' ry='6' width='80' height='34' />
    <rect x='2' y='480' rx='6' ry='6' width='90' height='27' />
    <rect x='118' y='476' rx='22' ry='22' width='150' height='46' />
  </ContentLoader>
)

export default Skeleton

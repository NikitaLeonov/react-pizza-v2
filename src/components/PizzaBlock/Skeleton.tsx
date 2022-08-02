import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <ContentLoader
      speed={2}
      width={280}
      height={513}
      viewBox='0 0 280 513'
      backgroundColor='#f2f2f2'
      foregroundColor='#f5f5f5'
    >
      <rect x='10' y='10' rx='100%' ry='100%' width='248' height='248' />
      <rect x='16' y='274' rx='6' ry='6' width='248' height='34' />
      <rect x='16' y='358' rx='6' ry='6' width='248' height='34' />
      <rect x='16' y='400' rx='6' ry='6' width='120' height='34' />
      <rect x='144' y='400' rx='6' ry='6' width='120' height='34' />
      <rect x='16' y='460' rx='6' ry='6' width='90' height='45' />
      <rect x='116' y='460' rx='22' ry='22' width='148' height='45' />
    </ContentLoader>
  </div>
)

export default Skeleton

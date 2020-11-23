import { createBlockRendererFn, createInsertAtomicBlock } from '../../utils'
import { type } from './constains'
import ImageComponent from './Image'
export default function createImagePlugin({
  entityType = type,
  component = ImageComponent,
  decorator,
}) {
  let Image = component
  if (decorator) {
    Image = decorator(Image)
  }
  const handleInsert = createInsertAtomicBlock(entityType)
  return {
    blockRendererFn: createBlockRendererFn(entityType, Image),
    handleInsert,
  }
}

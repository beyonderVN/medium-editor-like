import { createBlockRendererFn, createInsertAtomicBlock } from '../../utils'
import { type } from './constains'
import ImageComponent from './Embed'
export default function createImagePlugin({
  entityType = type,
  component = ImageComponent,
  decorator,
}) {
  let Embed = component
  if (decorator) {
    Embed = decorator(Embed)
  }
  const handleInsert = createInsertAtomicBlock(entityType)
  return {
    blockRendererFn: createBlockRendererFn(entityType, Embed),
    handleInsert,
  }
}

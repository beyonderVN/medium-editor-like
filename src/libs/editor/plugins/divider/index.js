import {
  createBlockRendererFn,
  createBlockTypeIsActive,
  createInsertAtomicBlock,
} from '../../utils'
import DefaultDivider from './components/DefaultDivider'
import { type } from './constains'
const createDividerPlugin = ({
  entityType = type,
  dividerComponent = DefaultDivider,
  decorator,
} = {}) => {
  let Divider = dividerComponent
  if (typeof decorator === 'function') {
    Divider = decorator(Divider)
  }
  const handleInsert = createInsertAtomicBlock(entityType)
  const blockTypeIsActive = createBlockTypeIsActive(entityType)
  return {
    blockRendererFn: createBlockRendererFn(entityType, Divider),
    blockTypeIsActive,
    handleInsert,
  }
}

export default createDividerPlugin

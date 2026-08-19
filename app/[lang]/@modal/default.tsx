/**
 * Next 16 requires an explicit default for every parallel route slot, or the
 * build fails. Nothing renders here: the modal slot is empty unless an
 * interception matches.
 */
export default function ModalDefault() {
  return null
}

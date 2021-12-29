export interface IProductDetailContext {
  expanded: string | false
  handleExpanded: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void
}

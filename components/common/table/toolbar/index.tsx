import { getResolution } from '@/lib/utils'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import React from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { FaFilter } from 'react-icons/fa'

import { styled } from '@mui/material/styles'

interface Props {
  title: JSX.Element | string
  titleCount?: JSX.Element | number
  titleCountTooltip?: string
  titleExtra?: JSX.Element
  actions?: JSX.Element
}

const TableToolbar: React.FC<Props> = props => {
  const {
    title,
    titleCount,
    children,
    titleExtra,
    actions,
    titleCountTooltip = 'Количество'
  } = props

  const isMobile = getResolution() === 'MOBILE'

  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = () => setIsOpen(prev => !prev)

  const header = (
    <Grid
      sx={{ padding: '6px 12px' }}
      container
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            {typeof title === 'string' ? (
              <Typography
                sx={{ color: theme => theme.palette.primary.light, userSelect: 'none' }}
                variant="h6"
              >
                {title}
              </Typography>
            ) : (
              title
            )}
          </Grid>

          {titleCount ? (
            <Grid item sx={{ paddingTop: '2px!important' }}>
              <Tooltip title={titleCountTooltip} placement="right-end">
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.85, userSelect: 'none', fontSize: 12 }}
                >
                  {titleCount}
                </Typography>
              </Tooltip>
            </Grid>
          ) : null}
          {titleExtra && <Grid item>{titleExtra}</Grid>}
        </Grid>
      </Grid>
      <Grid item>{actions}</Grid>
    </Grid>
  )

  const mobileContent = (
    <>
      <StyledAccordion expanded={isOpen} onChange={toggle} elevation={1}>
        <StyledAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${title}-filter-accordion`}
          id={`${title}-filter-accordion`}
        >
          <FaFilter />
          <Typography sx={{ width: '90%', flexShrink: 0 }}>Фильтры</Typography>
        </StyledAccordionSummary>
        {children}
      </StyledAccordion>
    </>
  )

  const destopContent = (
    <>
      <Divider />
      {children}
    </>
  )

  return (
    <>
      <Toolbar
        sx={{ display: 'block', padding: '0px!important', minHeight: '44px !important' }}
      >
        {header}
        {children ? (isMobile ? mobileContent : destopContent) : null}
      </Toolbar>
      <Divider />
    </>
  )
}

export default TableToolbar

const StyledAccordion = styled(Accordion)`
  border: none;
  border-radius: 0px !important;
`

const StyledAccordionSummary = styled(AccordionSummary)`
  min-height: 20px !important;
  & > div:nth-of-type(1) {
    margin: 8px 0;
    align-items: center;
    & > p {
      padding-left: 6px;
    }
  }
`

import { clsx } from 'clsx'

import s from './Pagination.module.scss'

import { ArrowIosBack, ArrowIosForward } from '@/shared/ui/icons'
import { usePagination } from '@/shared/ui/pagination/usePagination'
import { Typography } from '@/shared/ui/typography'
import { ControlledSelect } from 'src/shared/ui/select'

// type PaginationConditionals = {
//   perPage?: Nullable<number>
//   perPageOptions?: Nullable<any[]>
//   onPerPageChange?: Nullable<(itemPerPage: number) => void>
// }
// TODO вероятно этот тип можно зарефакторить используя Nullable как написано выше
type PaginationConditionals =
  | {
      perPage?: null
      perPageOptions?: never
      onPerPageChange?: never
    }
  | {
      perPage: number
      perPageOptions: any[]
      onPerPageChange: (itemPerPage: number) => void
    }

export type Props = {
  count: number
  page: number
  onChange: (page: number) => void
  siblings?: number
  perPage?: number
  perPageOptions?: any[]
  onPerPageChange?: (itemPerPage: number) => void
} & PaginationConditionals

const classNames = {
  root: s.root,
  container: s.container,
  selectBox: s.selectBox,
  select: s.select,
  item: s.item,
  dots: s.dots,
  icon: s.icon,
  show: s.show,
  onPage: s.onPage,
  pageButton(selected?: boolean) {
    return clsx(this.item, selected && s.selected)
  },
}

export const Pagination = (props: Props) => {
  const { onChange, count, page, perPage = null, perPageOptions, onPerPageChange, siblings } = props

  const {
    paginationRange,
    isLastPage,
    isFirstPage,
    handlePreviousPageClicked,
    handleNextPageClicked,
    handleMainPageClicked,
  } = usePagination({
    page,
    count,
    onChange,
    siblings,
  })

  const showPerPageSelect = !!perPageOptions && !!onPerPageChange

  return (
    <div className={classNames.root}>
      <div className={classNames.container}>
        <PrevButton onClick={handlePreviousPageClicked} disabled={isFirstPage} />

        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />

        <NextButton onClick={handleNextPageClicked} disabled={isLastPage} />
      </div>

      {showPerPageSelect && (
        <PerPageSelect
          {...{
            perPage,
            perPageOptions,
            onPerPageChange,
          }}
        />
      )}
    </div>
  )
}

type NavigationButtonProps = {
  onClick: () => void
  disabled?: boolean
}

type PageButtonProps = NavigationButtonProps & {
  page: number
  selected: boolean
}

const Dots = () => {
  return <span className={classNames.dots}>&#8230;</span>
}
const PageButton = (props: PageButtonProps) => {
  const { onClick, disabled, selected, page } = props

  return (
    <button
      onClick={onClick}
      disabled={selected || disabled}
      className={classNames.pageButton(selected)}
    >
      {page}
    </button>
  )
}
const PrevButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button
      aria-label="change-page-left"
      className={classNames.item}
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowIosBack className={classNames.icon} />
    </button>
  )
}

const NextButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button
      aria-label="change-page-right"
      className={classNames.item}
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowIosForward className={classNames.icon} />
    </button>
  )
}

type MainPaginationButtonsProps = {
  paginationRange: (number | string)[]
  currentPage: number
  onClick: (pageNumber: number) => () => void
}

const MainPaginationButtons = (props: MainPaginationButtonsProps) => {
  const { paginationRange, currentPage, onClick } = props

  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') {
          return <Dots key={index} />
        }

        return <PageButton key={index} page={page} selected={isSelected} onClick={onClick(page)} />
      })}
    </>
  )
}

export type PerPageSelectProps = {
  perPageOptions: any[]
  onPerPageChange: (itemPerPage: number) => void
}

export const PerPageSelect = ({ perPageOptions, onPerPageChange }: PerPageSelectProps) => {
  return (
    <div className={classNames.selectBox}>
      <Typography variant={'regular14'} className={classNames.show}>
        Show
      </Typography>
      <ControlledSelect
        classname={classNames.select}
        defaultValue={perPageOptions[0].value}
        options={perPageOptions}
        onValueChange={onPerPageChange}
      />
      <Typography variant={'regular14'} className={classNames.onPage}>
        on page
      </Typography>
    </div>
  )
}

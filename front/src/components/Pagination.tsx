import { Icon } from "./icon/Icon";


interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    pageSize: number;
    setPageSize: (pageSize: number) => void;
    hasNextPage: boolean;
    isLoading: boolean;
}

export function Pagination(props: PaginationProps) {

    const { page, setPage, pageSize, setPageSize, hasNextPage, isLoading } = props;

    return (
        <div className="pagination-box" >
            <div className="pagination-controls">
                <button onClick={() => setPage(page - 1)} disabled={isLoading || page === 1}><Icon type="chevron-left" /></button>
                <span>{`${page}`}</span>
                <button disabled={!hasNextPage || isLoading} onClick={() => setPage(page + 1)}><Icon type="chevron-right" /></button>
            </div>
            <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                <option value={5}>{"5"}</option>
                <option value={10}>{"10"}</option>
                <option value={20}>{"20"}</option>
            </select>
        </div >
    )
}
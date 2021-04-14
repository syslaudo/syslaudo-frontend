import { useEffect, useState } from 'react';
import DataTable, {
  IDataTableColumn,
  IDataTableProps,
} from 'react-data-table-component';
import { ActionButton, customStyles, FilterInput } from './styles';

interface Column extends IDataTableColumn<Object> {
  selector: string;
}

interface TableProps extends IDataTableProps {
  title: string;
  columns: Column[];
  data: Object[];
  selectableRows?: boolean;
  onRemove: (e: any) => void;
  onEdit: (e: any) => void;
}

export function Table(props: TableProps) {
  const columns = [
    ...props.columns,
    {
      name: 'Ações',
      cell: (row: any) => (
        <div data-tag="allowRowEvents">
          <ActionButton id={row.id} type="button" onClick={props.onEdit}>
            <i className="far fa-edit" title="Editar"></i>
          </ActionButton>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <ActionButton id={row.id} type="button" onClick={props.onRemove}>
            <i className="fas fa-trash-alt" title="Remover"></i>
          </ActionButton>
        </div>
      ),
      sortable: false,
      grow: 1,
    },
  ];

  const filterColumns = props.columns.reduce(function (acc: Column[], column) {
    if (!(column.name === 'Id')) {
      acc.push(column);
    }
    return acc;
  }, []);

  const [filterBy, setFilterBy] = useState(filterColumns[0].selector);
  const [filterQuery, setFilterQuery] = useState('');
  const [filteredData, setFilteredData] = useState(props.data);

  useEffect(() => {
    setFilteredData(props.data);
  }, [props.data]);

  function filterData(filterQuery: string) {
    const filtered = props.data.filter((item) =>
      // @ts-ignore
      String(item[filterBy]).toLowerCase().includes(filterQuery.toLowerCase()),
    );

    setFilteredData(filtered);
  }

  return (
    <>
      <FilterInput>
        <div>
          <label>Filtrar por:</label>
          <select
            name="filter-by"
            id="filter-by"
            onChange={(e) => {
              setFilterBy(e.target.value);
              setFilterQuery('');
              setFilteredData(props.data);
            }}
          >
            {filterColumns.map((column) => {
              return (
                <option key={column.selector} value={column.selector}>
                  {column.name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => {
              setFilterQuery(e.target.value);
              filterData(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setFilterQuery('');
              setFilteredData(props.data);
            }}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
      </FilterInput>
      <DataTable
        title={props.title}
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={20}
        noHeader
        striped
        highlightOnHover
        customStyles={customStyles}
        expandableRows={props.expandableRows}
        expandOnRowClicked={props.expandOnRowClicked}
        expandableRowsComponent={props.expandableRowsComponent}
        expandableRowDisabled={props.expandableRowDisabled}
      />
    </>
  );
}

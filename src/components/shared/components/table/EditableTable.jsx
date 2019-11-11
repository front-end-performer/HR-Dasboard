/* eslint-disable consistent-return */
import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

export default class EditableTable extends PureComponent {
  static propTypes = {
    heads: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      editable: PropTypes.bool,
      sortable: PropTypes.bool,
    })).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const originalRows = this.props.rows;
    const rows = originalRows.slice(0, 10);
    this.state = { rows, originalRows };
  }

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i += 1) {
      const rowToUpdate = rows[i];
      rows[i] = update(rowToUpdate, { $merge: updated });
    }

    this.setState({ rows });
  };

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const sortRows = this.state.originalRows.slice(0);
    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0, 10) : sortRows.sort(comparer).slice(0, 10);

    this.setState({ rows });
  };

  rowGetter = i => this.state.rows[i];

  render() {
    return (
      <div className="table">
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          enableCellSelect
          columns={this.props.heads}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          rowHeight={44}
          minColumnWidth={100}
        />
      </div>
    );
  }
}

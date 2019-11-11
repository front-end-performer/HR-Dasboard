/* eslint-disable consistent-return */
import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';

export default class DataPaginationTable extends PureComponent {
  static propTypes = {
    heads: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      editable: PropTypes.bool,
      sortable: PropTypes.bool,
    })).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  rowGetter = i => this.props.rows[i];

  render() {
    return (
      <div className="table">
        <ReactDataGrid
          columns={this.props.heads}
          rowGetter={this.rowGetter}
          rowsCount={this.props.rows.length}
          rowHeight={44}
          minColumnWidth={100}
        />
      </div>
    );
  }
}

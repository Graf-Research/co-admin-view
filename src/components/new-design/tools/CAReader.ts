import { CAInput, CAOutput } from "./types";

export class CAReader {
  parseColon(colon_separated_string: string): string[] {
    const regex_css = /(?:\\:|[^:])+/g;
    let match, output = [];
    while (match = regex_css.exec(colon_separated_string)) {
      output.push(match[0].replace(/\\:/g, ':'));
    }

    return output;
  }

  parseComma(comma_separated_string: string): string[] {
    const regex_css = /(?:[^,])+/g;
    let match, output = [];
    while (match = regex_css.exec(comma_separated_string)) {
      output.push(match[0].replace(/\\:/g, ':'));
    }

    return output;
  }

  parseAt(at_separated_string: string): string[] {
    const regex_css = /(?:[^@])+/g;
    let match, output = [];
    while (match = regex_css.exec(at_separated_string)) {
      output.push(match[0].replace(/\\:/g, ':'));
    }

    return output;
  }

  getTableColumns(columns: CAInput.TableColumn[]): CAOutput.TableColumn[] {
    const out: CAOutput.TableColumn[] = [];
    for (let i = 0; i < columns.length; i++) {
      const css = this.parseColon(columns[i]);
      if (css.length < 1 || css.length > 2) {
        throw new Error(`table columns index ${i + 1} unexpected length ${css.length}, should be 1 or 2 colon string separated`);
      }
      const key = css[0];
      const duplicate_column_index = out.findIndex(c => c.key == key);
      if (duplicate_column_index != -1) {
        throw new Error(`table columns index ${i + 1} column key ${key} duplicated, already exist on index ${duplicate_column_index}`);
      }
      out.push({
        key,
        label: css[1]
      });
    }
    return out;
  }

  getTableFilters(columns: CAOutput.TableColumn[], available_option_data_source_keys: string[], filters?: CAInput.TableFilter[]): CAOutput.TableFilter[] {
    if (!filters) {
      return [];
    }

    const out: CAOutput.TableFilter[] = [];
    for (let i = 0; i < filters.length; i++) {
      const css = this.parseColon(filters[i]);
      if (css.length < 3 || css.length > 4) {
        throw new Error(`filter columns index ${i + 1} unexpected length ${css.length}, should be 3 or 4 colon string separated`);
      }
      const type: CAInput.AvailableTableFilter = css[0] as CAInput.AvailableTableFilter;
      switch (type) {
        case "freetext":
        case "checkbox":
        case "select":
          break;
        default:
          throw new Error(`filter columns index ${i + 1} filter type "${type}" is not available`);
      }
      const source_key = css[2];
      const sk_column_index = columns.findIndex((c: CAOutput.TableColumn) => c.key == source_key);
      if (sk_column_index == -1) {
        throw new Error(`filter columns index ${i + 1} source key "${source_key}" doesn't exist on table columns`);
      }

      const query_key = css[1];
      if (type === 'select' && !available_option_data_source_keys.includes(query_key)) {
        throw new Error(`filter columns index ${i + 1} query key "${query_key}" options is not provided, please provide it first on table structure 'filter_options_data_source' key`);
      }

      const duplicate_filter_key_index = out.findIndex(c => c.query_key == query_key);
      if (duplicate_filter_key_index != -1) {
        throw new Error(`table columns index ${i + 1} filter query key "${query_key}" duplicated, already exist on index ${duplicate_filter_key_index}`);
      }

      out.push({
        type,
        query_key,
        source_key,
        label: css[3] ?? query_key
      });
    }
    return out;
  }

  getOptionsDataSource(data?: CAInput.OptionsDataSource[]): CAOutput.OptionsDataSource[] {
    if (!data) {
      return [];
    }
    const out: CAOutput.OptionsDataSource[] = [];
    for (let i = 0; i < data.length; i++) {
      const ass = this.parseAt(data[i]);
      if (ass.length != 2) {
        throw new Error(`options data source index ${i + 1} "${data[i]}" invalid format, should be <keys>@<url>`);
      }
      const keys = this.parseComma(ass[0]);
      if (keys.length == 0) {
        throw new Error(`options data source index ${i + 1} "${data[i]}" invalid keys cannot be empty, should be <keys>@<url>`);
      }
      out.push({
        query_keys: keys,
        source_url: ass[1]
      });
    }
    return out;
  }

  getFormItems(table_structure: CAOutput.TableStructure, available_option_data_source_keys: string[], items: CAInput.FormItem[]): [CAOutput.FormItem[], CAOutput.L0_FormItem[]] {
    const out: CAOutput.FormItem[] = [];
    const flatten_out: CAOutput.L0_FormItem[] = [];
    for (let i = 0; i < items.length; i++) {
      if (Array.isArray(items[i])) {
        const [sub_result] = this.getFormItems(table_structure, available_option_data_source_keys, items[i] as CAInput.FormItem[]) as [CAOutput.L2_FormItem, CAOutput.L0_FormItem[]];
        out.push(sub_result);

        // For Flatten Helper Purpose Only
        if (Array.isArray(sub_result)) {
          if (sub_result.length > 0 && Array.isArray(sub_result[0])) {
            for (const subsub_result of sub_result) {
              flatten_out.push(...(subsub_result as CAOutput.L0_FormItem[]));
            }
          } else {
            flatten_out.push(...(sub_result as CAOutput.L0_FormItem[]));
          }
        }

        continue;
      }
      const css = this.parseColon(items[i] as CAInput.L0_FormItem);

      // section detected
      if (css.length === 1) {
        out.push(items[i] as string);
        continue;
      }

      if (css.length < 3 || css.length > 4) {
        throw new Error(`form items index ${i + 1} unexpected length ${css.length}, should be 3 or 4 colon string separated`);
      }

      const type: CAInput.AvailableFormItemType = css[0] as CAInput.AvailableFormItemType;
      switch (type) {
        case "INPUT-TEXT":
        case "TEXTAREA":
        case "CHECKBOX":
        case "RADIO":
        case "SELECT":
          break;
        default:
          throw new Error(`form items index ${i + 1} form type "${type}" is not available`);
      }

      const source_key = css[2];
      const sk_column_index = table_structure.columns.findIndex(c => c.key == source_key);
      if (sk_column_index == -1) {
        throw new Error(`form items index ${i + 1} source key "${source_key}" doesn't exist on table columns`);
      }

      const data_key = css[1];
      if ((type === 'SELECT' || type === 'RADIO') && !available_option_data_source_keys.includes(data_key)) {
        throw new Error(`form items index ${i + 1} data key "${data_key}" options is not provided, please provide it first on form structure 'options_data_source' key`);
      }

      const duplicate_data_key_index = flatten_out.filter(c => typeof c !== 'string').findIndex(c => c.data_key == data_key);
      if (duplicate_data_key_index != -1) {
        throw new Error(`form items index ${i + 1} filter query key "${data_key}" duplicated, already exist on index ${duplicate_data_key_index}`);
      }

      const l0 = {
        type,
        source_key,
        data_key,
        label: css[3] ?? data_key
      };
      out.push(l0);
      flatten_out.push(l0);
    }
    return [out, flatten_out];
  }

  getTableStructure(data: CAInput.TableStructure): CAOutput.TableStructure {
    const columns = this.getTableColumns(data.columns);
    const filter_options_data_source = this.getOptionsDataSource(data.filter_options_data_source);
    const available_option_data_source_keys: string[] = filter_options_data_source.reduce((acc: string[], s) => [...acc, ...s.query_keys], []);
    const filters = this.getTableFilters(columns, available_option_data_source_keys, data.filters);

    const column_key_index = columns.findIndex(c => c.key == data.column_key);
    if (column_key_index == -1) {
      throw new Error(`table structure column key "${data.column_key}" doesn't exist on table columns`);
    }

    return {
      title: data.title,
      columns,
      column_key: data.column_key,
      search_query_key: data.search_query_key,
      filters,
      filter_options_data_source,
      urls: {
        get_url: data.urls.get_url,
        delete_url: data.urls.delete_url,
        export_url: data.urls.export_url,
      },
      request_init: data.request_init
    };
  }

  getFormStructure(table_structure: CAOutput.TableStructure, data: CAInput.FormStructure): CAOutput.FormStructure {
    const options_data_source = this.getOptionsDataSource(data.options_data_source);
    const available_option_data_source_keys: string[] = options_data_source.reduce((acc: string[], s) => [...acc, ...s.query_keys], []);
    const [items, flatten_out] = this.getFormItems(table_structure, available_option_data_source_keys, data.items);
    const form_items: CAOutput.FieldFormItem[] = flatten_out.filter(item => typeof item !== 'string');

    return {
      title: data.title,
      items,
      form_items,
      options_data_source,
      urls: {
        get_detail_url: data.urls.get_detail_url,
        create_new_url: data.urls.create_new_url,
        update_data_url: data.urls.update_data_url
      },
      request_init: data.request_init
    };
  }
}

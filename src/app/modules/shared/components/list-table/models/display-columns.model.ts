type TableData = 'commom' | 'currency' | 'document' | 'phone' | 'longText' | 'date' |'custom-color' | 'actions';


export type TableColumns = {
  column: string;
  text?: string;
  key: string;
  type?: TableData;
  typeColumn?: TypeColumn;
  checkCustomColor?: boolean;
  actions?: DisplayAction[];
};

export class DisplayColumns {
  public text!: string;
  public key!: string;
  public checkCustomColor?: boolean;
  public type?: TypeColumn;
  public actions?: DisplayAction[];
  public menu?: DisplayMenu[];
  public linkButtons?: DisplayLinkButton[];
}

export enum TypeColumn {
  Description,
  Action,
  LinkButton,
  Menu,
}

export class ColumnAction {
  public action?: (row: any) => void;
}

export class DisplayAction extends ColumnAction {
  public icon!: string;
  public colorIconWrapper?: string;
}

export class DisplayLinkButton extends ColumnAction {
  public text!: string;
}

export class DisplayMenu extends ColumnAction {
  public text!: string;
  public icon!: string;
}


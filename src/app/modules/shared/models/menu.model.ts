export class Menu {
  public label?: string;
  public icon?: string;
  public router?: string;
  public permission?: string;
  public childrens?: Menu[];
  public event?: () => void;
}
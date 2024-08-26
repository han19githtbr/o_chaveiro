export class ProjectButton {
  public type!: 'fill' | 'outline';
  public text!: string;
  public fullSize?: boolean;
  public event?: () => void;
}
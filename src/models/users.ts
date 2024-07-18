export type User = { username: string, workouttype: string, duration: number }
export type DropSetting = {
    singleSelection: boolean,
    idField: string,
    textField: string,
    selectAllText: string,
    unSelectAllText: string,
    itemsShowLimit: number,
    allowSearchFilter: boolean
  }
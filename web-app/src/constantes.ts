import { environment } from '../src/environments/environment';

export class Constantes
{
    public static get TEST2(): string { return environment.apiDietCompo + '/test2' }; 
    public static get TEST3(): string { return environment.apiDietCompo + '/test3' }; 
    public static get MIN_MAX_GLPSOL(): string { return environment.apiDietCompo + '/test' }; 
    public static get EDIT_FILE(): string { return environment.apiDietCompo + '/editFile' }; 
    public static get DOWNLOAD_FILE(): string { return environment.apiDietCompo + '/downloadFile' };
    public static get GET_TEXT_FILES(): string { return environment.apiDietCompo + '/getTextFiles'}; 
    public static get DELETE_FILES(): string { return environment.apiDietCompo + '/deleteAllfiles'}; 
}
import { Category } from './../../../category/shared/category';

export class Course {

    id: number;
    description: string;
    dateInit: Date;
    dateFinal: Date;
    qtd: number;
    category: Category;
    
}
import { Request, Response } from "express";
declare const readAllFoods: (req: Request, res: Response) => void;
declare const readFood: (req: Request, res: Response) => void;
declare const createFoods: (req: Request, res: Response) => void;
declare const updateFoods: (req: Request, res: Response) => void;
declare const updatePartialFoods: (req: Request, res: Response) => void;
declare const deleteFoods: (req: Request, res: Response) => void;
export { readFood, readAllFoods, createFoods, updateFoods, updatePartialFoods, deleteFoods, };

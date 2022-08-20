export interface IRegion {
  id: number;
  address: string;
}

export interface RegionSearchAPIResponseDto {
  ok: boolean;
  regions: IRegion[];
}

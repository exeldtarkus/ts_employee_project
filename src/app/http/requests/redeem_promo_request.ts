import {IMainRequest} from './main_request';
import {IPromoResourceModel} from '../../models/resource_models/IPromoResourceModel';
import {IPromoRepositoryFindOutput} from '../../models/repository_models/IPromoRepositoryModel';

interface IRedeemPromoDataRequest {
  promo: IPromoResourceModel;
  bengkelId: number;
  bengkel_name?: string;
  userId?: number;
  carId?: number;
  utm?: string;
  mobileNo?: string;
  paymentMethodId?: string;
  paymentAmount?: number;
  adirakuAccountId?: string;
  adirakuAccountOid?: string;
  cashback?: cashbackMoservice;
}

interface cashbackMoservice {
  adirakuCashbackRefId: string;
  adirakuCashbackCodeProgram: string;
  adirakuCashbackAmount: number;
}

interface IRedeemPromoRequest extends IMainRequest {
  body: IRedeemPromoDataRequest;
  promo: IPromoRepositoryFindOutput;
  promoPrice: number;
  totalPrice: number;
}

export {IRedeemPromoRequest, IRedeemPromoDataRequest, cashbackMoservice};

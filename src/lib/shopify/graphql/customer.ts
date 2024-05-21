// @ts-nocheck

import { shopify } from "@/lib/shopify";
import { customerOrderQuery, customerQuery } from "./queries";
import type {
  Customer,
  CustomerAccessTokenCreatePayload,
  CustomerCreatePayload,
  CustomerRecoverPayload,
  CustomerResetPayload,
  CustomerUpdateInput,
  CustomerUpdatePayload,
  MailingAddress,
  MailingAddressInput,
  Order,
} from "../types";
import {
  addAddressMutation,
  customerCreateMutation,
  customerRecoverMutation,
  customerResetMutation,
  customerUpdateMutation,
  loginMutation,
  removeAddressMutation,
  updateAddressMutation,
  updateDefaultAddressMutation,
} from "./mutations";

export async function createCustomer({
  variables,
}: {
  variables: {
    input: {
      email: string;
      password: string;
    };
  };
}) {
  const data = await shopify.request<{
    data: {
      customerCreate: CustomerCreatePayload;
    };
    variables: {
      input: {
        email: string;
        password: string;
      };
    };
  }>({
    query: customerCreateMutation,
    variables,
  });
  return data;
}

export async function loginCustomer({
  variables,
}: {
  variables: {
    input: {
      email: string;
      password: string;
    };
  };
}) {
  const data = await shopify.request<{
    data: {
      customerAccessTokenCreate: CustomerAccessTokenCreatePayload;
    };
    variables: {
      input: {
        email: string;
        password: string;
      };
    };
  }>({
    query: loginMutation,
    variables,
  });
  return data;
}

export async function recoverCustomersPassword({
  variables,
}: {
  variables: {
    email: string;
  };
}) {
  const data = await shopify.request<{
    data: {
      customerRecover: CustomerRecoverPayload;
    };
    variables: {
      email: string;
    };
  }>({
    query: customerRecoverMutation,
    variables,
  });
  return data;
}

export async function resetCustomersPassword({
  variables,
}: {
  variables: {
    id: string;
    input: {
      password: string;
      resetToken: string;
    };
  };
}) {
  const data = await shopify.request<{
    data: {
      customerReset: CustomerResetPayload;
    };
    variables: {
      id: string;
      input: {
        password: string;
        resetToken: string;
      };
    };
  }>({
    query: customerResetMutation,
    variables,
  });
  return data;
}

export async function getCustomer(
  customerAccessToken: string,
): Promise<Customer> {
  const res = await shopify.request<{
    data: { customer: Customer };
    variables: {
      customerAccessToken: string;
    };
  }>({
    query: customerQuery,
    variables: {
      customerAccessToken,
    },
  });

  /**
   * If the customer failed to load, we assume their access token is invalid.
   */
  if (!res?.body.data.customer) {
    // log out customer
  }

  return res.body.data.customer;
}

export async function deleteAddress({
  variables,
}: {
  variables: { customerAccessToken: string; id: string };
}) {
  const data = await shopify.request<{
    data: {
      customerAddressDelete: {
        customerUserErrors: {
          code: string;
          field: string[];
          message: string;
        }[];
      };
      deletedCustomerAddressId: string;
    };
    variables: {
      customerAccessToken: string;
      id: string;
    };
  }>({
    query: removeAddressMutation,
    variables,
  });

  return data;
}

export async function addAddress({
  variables,
}: {
  variables: { address: MailingAddressInput; customerAccessToken: string };
}) {
  const data = await shopify.request<{
    data: {
      customerAddressCreate: {
        customerAddress: MailingAddress;
        customerUserErrors: {
          code: string;
          field: string[];
          message: string;
        }[];
      };
    };
    variables: {
      address: MailingAddressInput;
      customerAccessToken: string;
    };
  }>({
    query: addAddressMutation,
    variables,
  });

  return data;
}

export async function updateAddress({
  variables,
}: {
  variables: {
    address: MailingAddressInput;
    customerAccessToken: string;
    id: string;
  };
}) {
  const data = await shopify.request<{
    data: {
      customerAddressUpdate: {
        customerAddress: MailingAddress;
        customerUserErrors: {
          code: string;
          field: string[];
          message: string;
        }[];
      };
    };
    variables: {
      address: MailingAddressInput;
      customerAccessToken: string;
      id: string;
    };
  }>({
    query: updateAddressMutation,
    variables,
  });

  return data;
}

export async function updateDefaultAddress({
  variables,
}: {
  variables: { addressId: string; customerAccessToken: string };
}) {
  const data = await shopify.request<{
    data: {
      customerDefaultAddressUpdate: {
        customerUserErrors: {
          code: string;
          field: string[];
          message: string;
        }[];
      };
    };
    variables: {
      addressId: string;
      customerAccessToken: string;
    };
  }>({
    query: updateDefaultAddressMutation,
    variables,
  });

  return data;
}

export async function updateAccount({
  variables,
}: {
  variables: { customer: CustomerUpdateInput; customerAccessToken: string };
}) {
  const data = await shopify.request<{
    data: {
      customerUpdate: CustomerUpdatePayload;
    };
    variables: {
      customerAccessToken: string;
      customer: CustomerUpdateInput;
    };
  }>({
    query: customerUpdateMutation,
    variables,
  });

  return data;
}

export async function getCustomerOrder(orderId: string) {
  const data = await shopify.request<{
    data: {
      node: Order;
    };
    variables: { orderId: string };
  }>({
    query: customerOrderQuery,
    variables: { orderId },
  });

  return data;
}

const REVENUECAT_API_KEY = import.meta.env.VITE_REVENUECAT_API_KEY;

let isConfigured = false;

export const initializeRevenueCat = async (userId: string) => {
  if (!REVENUECAT_API_KEY) {
    console.warn('RevenueCat API key not configured');
    return;
  }

  try {
    if (!isConfigured) {
      await Purchases.configure(REVENUECAT_API_KEY);
      isConfigured = true;
    }
    
    await Purchases.logIn(userId);
    console.log('RevenueCat initialized successfully');
  } catch (error) {
    console.error('Failed to initialize RevenueCat:', error);
  }
};

export const showPaywall = async (productId: string) => {
  if (!isConfigured) {
    console.warn('RevenueCat not configured');
    return false;
  }

  try {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings.current;
    
    if (!currentOffering) {
      console.warn('No offerings available');
      return false;
    }

    // Show paywall UI - this would typically be a modal
    const product = currentOffering.availablePackages.find(pkg => pkg.identifier === productId);
    
    if (product) {
      const purchaseResult = await Purchases.purchasePackage(product);
      return purchaseResult.customerInfo.entitlements.active[productId] !== undefined;
    }
    
    return false;
  } catch (error) {
    console.error('Paywall error:', error);
    return false;
  }
};

export const checkSubscriptionStatus = async (): Promise<'free' | 'premium' | 'creator'> => {
  if (!isConfigured) {
    return 'free';
  }

  try {
    const customerInfo = await Purchases.getCustomerInfo();
    
    if (customerInfo.entitlements.active['creator']) {
      return 'creator';
    } else if (customerInfo.entitlements.active['premium']) {
      return 'premium';
    }
    
    return 'free';
  } catch (error) {
    console.error('Failed to check subscription status:', error);
    return 'free';
  }
};

export const restorePurchases = async () => {
  if (!isConfigured) {
    return;
  }

  try {
    await Purchases.restorePurchases();
  } catch (error) {
    console.error('Failed to restore purchases:', error);
  }
};
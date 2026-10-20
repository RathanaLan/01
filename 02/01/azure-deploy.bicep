// ========================================================
// DNKH DNA MATRIX - AZURE ENTERPRISE INFRASTRUCTURE (BICEP)
// "Connecting Knowledge. Driving Excellence."
// ========================================================

@description('Deployment environment name (dev, staging, prod)')
@allowed(['dev', 'staging', 'prod'])
param environment string = 'prod'

@description('Primary Azure region for DNKH manufacturing services')
param location string = resourceGroup().location

@description('Base workload name for resource naming')
param workloadName string = 'dnkh-dna-matrix'

// Variables
var appName = '${workloadName}-${environment}'
var storageAccountName = 'st${replace(workloadName, '-', '')}${environment}'
var keyVaultName = 'kv-${workloadName}-${environment}'
var appInsightsName = 'appi-${workloadName}-${environment}'
var logAnalyticsName = 'log-${workloadName}-${environment}'

// 1. Log Analytics Workspace
resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: logAnalyticsName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 90
    features: {
      searchVersion: 1
    }
  }
}

// 2. Application Insights for Operational Telemetry
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// 3. Azure Key Vault for Secure Credential & API Key Management
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: keyVaultName
  location: location
  properties: {
    enabledForDeployment: true
    enabledForTemplateDeployment: true
    enabledForDiskEncryption: false
    tenantId: subscription().tenantId
    enableRbacAuthorization: true
    sku: {
      name: 'standard'
      family: 'A'
    }
    networkAcls: {
      defaultAction: 'Allow'
      bypass: 'AzureServices'
    }
  }
}

// 4. Azure Storage Account for Controlled Engineering Evidence & Drawings
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_ZRS' // Zone-redundant storage for high availability
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    allowBlobPublicAccess: false // Strict zero-trust enterprise compliance
    encryption: {
      services: {
        blob: {
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
  }
}

// Storage Containers
resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccount
  name: 'default'
}

resource containerEvidence 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: blobService
  name: 'controlled-evidence'
  properties: {
    publicAccess: 'None'
  }
}

resource containerDrawings 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: blobService
  name: 'engineering-drawings'
  properties: {
    publicAccess: 'None'
  }
}

// 5. Azure Static Web App (Front-End & API Hosting)
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: appName
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    allowConfigFileUpdates: true
    stagingEnvironmentPolicy: 'Enabled'
    enterpriseGradeCdnStatus: 'Enabled'
  }
}

// Outputs
output staticWebAppDefaultHostname string = staticWebApp.properties.defaultHostname
output storageAccountId string = storageAccount.id
output keyVaultUri string = keyVault.properties.vaultUri
output appInsightsConnectionString string = appInsights.properties.ConnectionString


import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
// import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('window');


const FinancialDashboard = () => {
  // Sample data
  const router = useRouter();
  const accountBalance = 24750.50;
  const monthlyIncome = 8500.00;
  const monthlyExpenses = 3200.75;
  const savings = 5299.25;

  const transactions = [
    { id: 1, title: 'Salary Deposit', amount: 8500.00, type: 'income', date: '2024-01-15' },
    { id: 2, title: 'Grocery Shopping', amount: -125.50, type: 'expense', date: '2024-01-14' },
    { id: 3, title: 'Investment Return', amount: 450.00, type: 'income', date: '2024-01-13' },
    { id: 4, title: 'Utility Bills', amount: -280.00, type: 'expense', date: '2024-01-12' },
    { id: 5, title: 'Coffee Shop', amount: -15.75, type: 'expense', date: '2024-01-11' },
  ];

  const categories = [
    { name: 'Food & Dining', amount: 850, percentage: 35, color: '#FF6B6B' },
    { name: 'Transportation', amount: 420, percentage: 25, color: '#4ECDC4' },
    { name: 'Shopping', amount: 320, percentage: 20, color: '#45B7D1' },
    { name: 'Entertainment', amount: 180, percentage: 12, color: '#96CEB4' },
    { name: 'Others', amount: 130, percentage: 8, color: '#FFEAA7' },
  ];

  const StatCard = ({ title, amount, subtitle, color = '#4CAF50' }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statAmount, { color }]}>
        ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const TransactionItem = ({ transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[
          styles.transactionIcon,
          { backgroundColor: transaction.type === 'income' ? '#E8F5E8' : '#FFE8E8' }
        ]}>
          <Text style={[
            styles.transactionIconText,
            { color: transaction.type === 'income' ? '#4CAF50' : '#F44336' }
          ]}>
            {transaction.type === 'income' ? '+' : '-'}
          </Text>
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionTitle}>{transaction.title}</Text>
          <Text style={styles.transactionDate}>{transaction.date}</Text>
        </View>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: transaction.type === 'income' ? '#4CAF50' : '#F44336' }
      ]}>
        {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
      </Text>
    </View>
  );

  const CategoryItem = ({ category }) => (
    <View style={styles.categoryItem}>
      <View style={styles.categoryLeft}>
        <View style={[styles.categoryColor, { backgroundColor: category.color }]} />
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
      <View style={styles.categoryRight}>
        <Text style={styles.categoryAmount}>${category.amount}</Text>
        <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style = {styles.headerContainer}>
        <View style={styles.backArrow} >
          <TouchableOpacity style={styles.iconbackground} onPress={()=>router.back()}>
            <Icon name='arrow-circle-left' size={30} />
          </TouchableOpacity>
        </View>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
          ${accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={[styles.actionButton, styles.sendButton]}>
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.receiveButton]}>
            <Text style={styles.actionButtonText}>Receive</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Monthly Income"
          amount={monthlyIncome}
          subtitle="+12% from last month"
          color="#4CAF50"
        />
        <StatCard
          title="Monthly Expenses"
          amount={monthlyExpenses}
          subtitle="-5% from last month"
          color="#F44336"
        />
        <StatCard
          title="Total Savings"
          amount={savings}
          subtitle="+8% from last month"
          color="#2196F3"
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Text style={[styles.quickActionIconText, { color: '#2196F3' }]}>💳</Text>
            </View>
            <Text style={styles.quickActionText}>Pay Bills</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#E8F5E8' }]}>
              <Text style={[styles.quickActionIconText, { color: '#4CAF50' }]}>📊</Text>
            </View>
            <Text style={styles.quickActionText}>Invest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Text style={[styles.quickActionIconText, { color: '#FF9800' }]}>🎯</Text>
            </View>
            <Text style={styles.quickActionText}>Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#F3E5F5' }]}>
              <Text style={[styles.quickActionIconText, { color: '#9C27B0' }]}>📈</Text>
            </View>
            <Text style={styles.quickActionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionsList}>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </View>
      </View>

      {/* Spending Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spending Categories</Text>
        <View style={styles.categoriesList}>
          {categories.map((category, index) => (
            <CategoryItem key={index} category={category} />
          ))}
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer:{
   flexDirection:"row",
   justifyContent:"space-between",
   alignItems:"center",
   paddingTop: 60,
  },
  backArrow: {
    paddingHorizontal: 20,
  },
  iconbackground: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
    borderRadius: 50

  },
  header: {
    paddingHorizontal: 20,
    // paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceCard: {
    backgroundColor: '#2196F3',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#2196F3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  receiveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  statsGrid: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionIconText: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  transactionsList: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionIconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesList: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  categoryPercentage: {
    fontSize: 12,
    color: '#999',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default FinancialDashboard;
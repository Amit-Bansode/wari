import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'LanguageSelection'>;

const languages = [
  { label: 'marathi', value: 'mr' },
  { label: 'english', value: 'en' },
];

const LanguageSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (lang: string) => {
    setSelected(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('select_language')}</Text>
      <View style={styles.langRow}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.value}
            style={[styles.langBtn, selected === lang.value && styles.langBtnSelected]}
            onPress={() => handleSelect(lang.value)}
          >
            <Text style={styles.langText}>{t(lang.label)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={[styles.confirmBtn, !selected && { opacity: 0.5 }]}
          disabled={!selected}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.confirmBtnText}>{t('confirm')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#19202C',
    marginBottom: 32,
    textAlign: 'center',
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  langBtn: {
    backgroundColor: '#6B7A8F',
    borderRadius: 8,
    width: 170,
    height: 90,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langBtnSelected: {
    borderWidth: 2,
    borderColor: '#19202C',
  },
  langText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 370,
  },
  confirmBtn: {
    backgroundColor: '#6B7A8F',
    borderRadius: 8,
    height: 48,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default LanguageSelectionScreen; 
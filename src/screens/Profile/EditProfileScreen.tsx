import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    Platform,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { updateProfile } from '../../services/authService';
import Toast from 'react-native-toast-message';

const EditProfileScreen = () => {
    const navigation = useNavigation<any>();
    const { user, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState(user?.name || '');
    const [gender, setGender] = useState(user?.gender === 'female' ? 'Perempuan' : 'Laki-laki');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');

    const handleSave = async () => {
        if (!name || !phone || !email) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Mohon lengkapi semua data',
            });
            return;
        }

        setIsLoading(true);
        try {
            const apiGender = gender === 'Perempuan' ? 'female' : 'male';
            const payload = {
                name,
                email,
                phone,
                gender: apiGender
            };

            const response = await updateProfile(user?.id || '', payload);

            if (response && response.success !== false) {
                await updateUser(payload);
                Toast.show({
                    type: 'success',
                    text1: 'Sukses',
                    text2: 'Profil berhasil diperbarui',
                });
                navigation.goBack();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Gagal',
                    text2: response.message || 'Gagal memperbarui profil',
                });
            }
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Terjadi kesalahan sistem',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const renderInput = (label: string, value: string, onChangeText: (text: string) => void, placeholder?: string, multiline = false) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, multiline && styles.multilineInput]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={COLORS.grey}
                multiline={multiline}
                textAlignVertical={multiline ? 'top' : 'center'}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={normalize(24)} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ubah Profil</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveText}>Simpan</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Informasi Dasar</Text>
                    {renderInput('Nama', name, setName, 'Masukkan nama lengkap')}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Jenis Kelamin</Text>
                    <View style={styles.genderContainer}>
                        {['Laki-laki', 'Perempuan'].map((g) => (
                            <TouchableOpacity
                                key={g}
                                style={[
                                    styles.genderOption,
                                    gender === g && styles.genderOptionSelected
                                ]}
                                onPress={() => setGender(g)}
                            >
                                <View style={[
                                    styles.radioCircle,
                                    gender === g && styles.radioCircleSelected
                                ]}>
                                    {gender === g && <View style={styles.radioInner} />}
                                </View>
                                <Text style={[
                                    styles.genderText,
                                    gender === g && styles.genderTextSelected
                                ]}>{g}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Informasi Kontak</Text>
                    {renderInput('Nomor HP', phone, setPhone, 'Masukkan nomor HP', false)}
                    {renderInput('Email', email, setEmail, 'Masukkan alamat email', false)}
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, isLoading && { opacity: 0.7 }]}
                    onPress={handleSave}
                    disabled={isLoading}
                >
                    <Text style={styles.saveButtonText}>
                        {isLoading ? 'Memproses...' : 'Simpan Perubahan'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.white,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: COLORS.black,
    },
    saveText: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    scrollContent: {
        padding: SPACING.md,
    },
    section: {
        marginBottom: SPACING.lg,
    },
    sectionHeader: {
        fontSize: normalize(14),
        fontWeight: '600',
        color: COLORS.grey,
        marginBottom: SPACING.sm,
        textTransform: 'uppercase',
    },
    inputContainer: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: normalize(14),
        color: COLORS.black,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        paddingHorizontal: SPACING.md,
        paddingVertical: Platform.OS === 'ios' ? SPACING.sm : 6,
        fontSize: normalize(15),
        color: COLORS.black,
        backgroundColor: '#FCFCFC',
    },
    multilineInput: {
        height: normalize(80),
        textAlignVertical: 'top',
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.xl,
        paddingVertical: 8,
    },
    genderOptionSelected: {
        // Option to add highlight or background for selected state if needed
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    radioCircleSelected: {
        borderColor: COLORS.primary,
    },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },
    genderText: {
        fontSize: normalize(15),
        color: COLORS.grey,
    },
    genderTextSelected: {
        color: COLORS.black,
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radiusLg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        marginTop: SPACING.md,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: normalize(16),
        fontWeight: 'bold',
    },
});

export default EditProfileScreen;
